import axios, { type AxiosInstance } from "axios";
import { queryClient } from "./queryClient";
import { is } from "@/utils/is";
import { loadStore, removeStore, saveStore } from "@/utils/storage";
import type { IOrderData } from "@/types/order";

// -------------------------------
// Types
// -------------------------------
export interface IAPIResponse {
  status: "success" | "error";
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: any;
  message?: string;
}

// -------------------------------
// Config
// -------------------------------
const baseURL = import.meta.env.VITE_BACKEND_URL;
const timeOut = Number(import.meta.env.VITE_API_TIMEOUT) || 30000; // 30 seconds

class Api {
  instance: AxiosInstance;

  constructor() {
    this.instance = axios.create({
      baseURL,
      timeout: timeOut,
      withCredentials: true, // for refresh token cookies
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    // -------------------------------
    // REQUEST INTERCEPTOR
    // -------------------------------
    this.instance.interceptors.request.use(async (config) => {
      const accessToken = loadStore("access_token");
      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
      return config;
    });

    // -------------------------------
    // RESPONSE INTERCEPTOR (REFRESH FLOW)
    // -------------------------------
    this.instance.interceptors.response.use(
      (res) => res,
      async (error) => {
        const originalRequest = error.config;
        const key = error.response?.data.key || false;
        console.error("API error response:", key);

        // 401 → try refreshing access token ONLY once
        if (error.response?.status === 401 && key && !originalRequest._retry) {
          originalRequest._retry = true;

          try {
            const tokenResponse = await this.getAccessToken();

            const newAccessToken = tokenResponse.data?.credential?.accessToken;

            if (!newAccessToken) {
              throw new Error("No access token returned from backend");
            }

            // Save new token
            saveStore("access_token", newAccessToken);

            // Update header
            originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

            // Retry the original request
            return this.instance.request(originalRequest);
          } catch (refreshError) {
            console.error("Token refresh failed:", refreshError);
            return Promise.reject("Authentication failed");
          }
        }

        // Normal error extraction
        const errorMessage =
          error.response?.data?.message ||
          error.response?.data?.detail ||
          error.message ||
          "An unknown error occurred";

        return Promise.reject(errorMessage);
      },
    );
  }

  // -------------------------------
  // HANDLE RESPONSE (Used by all methods)
  // -------------------------------
  handleResponse = async (
    method: "get" | "post" | "put" | "delete" | "patch",
    url: string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    params?: any,
    signal?: AbortSignal,
  ): Promise<IAPIResponse> => {
    if (!baseURL) {
      return {
        status: "error",
        message: "No backend URL provided",
      };
    }

    const queryKey = [url, params, method];

    const response = await queryClient.fetchQuery({
      queryKey,
      queryFn: () =>
        this.instance.request({
          method,
          url,
          params: method === "get" ? params : undefined,
          data: method !== "get" ? params : undefined,
          signal,
        }),
    });

    const status = response.status;
    const data = response.data;
    const message = data?.message || data?.detail || "An error occurred";

    if (is.dev) console.info("API response:", response);

    if (status >= 200 && status < 300) {
      return { status: "success", data };
    }
    return { status: "error", message };
  };

  // -------------------------------
  // AUTH METHODS
  // -------------------------------

  register = async (user: {
    name: string;
    email: string;
    password: string;
    contact: string;
    shippingAddress: string;
    address?: string;
  }) => {
    return this.handleResponse("post", "/user/register", user);
  };

  login = async (user: { email: string; password: string }) => {
    const response = await this.handleResponse("post", "/user/login", user);

    if (response.status === "success") {
      const token = response?.data?.credential?.accessToken;
      if (token) saveStore("access_token", token);
    }

    return response;
  };

  logout = async () => {
    removeStore("access_token");
    return this.handleResponse("post", "/user/logout");
  };

  getAccessToken = async (role: string = "user") => {
    // IMPORTANT: Do NOT modify; backend expects refresh token cookie
    return this.handleResponse("post", `/access-token/generate/${role}`);
  };

  // -------------------------------
  // PRODUCT / CART API
  // -------------------------------
  getPublishedProducts = async () => {
    return this.handleResponse("get", "/product/published");
  };

  getPublishedRestaurant = async () => {
    return this.handleResponse("get", "/restaurant/all");
  };

  // ------------------------------+
  // API
  // -------------------------------

  getAllProducts = async () => {
    return this.handleResponse("get", `/product/all`);
  };

  getCartProduct = async (user_id: string) => {
    return this.handleResponse("get", `/cart/items/${user_id}`);
  };

  addToCart = async (item: { user: string; product: string }) => {
    return this.handleResponse("post", "/cart/add", item);
  };

  removeCartItem = async (cartItemId: string) => {
    console.log("API: Removing cart item with ID:", cartItemId);
    return this.handleResponse("delete", `/cart/remove/${cartItemId}`);
  };

  updateCartQuantity = async (
    item: { quantity: number },
    cartItemId: string,
  ) => {
    return this.handleResponse("post", `/cart/quantity/${cartItemId}`, item);
  };

  // -------------------------------
  // CHECKOUT API
  // -------------------------------
  createCheckoutSession = async (data: IOrderData) => {
    return this.handleResponse("post", "/checkout/create-session", data);
  };

  completeCheckout = async (checkoutId: string) => {
    return this.handleResponse("patch", `/checkout/complete/${checkoutId}`);
  };

  cancelCheckout = async (checkoutId: string) => {
    return this.handleResponse("patch", `/checkout/cancel/${checkoutId}`);
  };

  // -------------------------------
  // ORDERS API
  // -------------------------------
  getOrders = async (user_id: string) => {
    return this.handleResponse("get", `/order/${user_id}`);
  };

  // -------------------------------
  // RESTAURANT AUTH API
  // -------------------------------
  restaurantRegister = async (data: {
    name: string;
    email: string;
    contact: string;
    shippingAddress: string;
    password: string;
  }) => {
    return this.handleResponse("post", "/restaurant/register", data);
  };

  restaurantLogin = async (data: { email: string; password: string }) => {
    const response = await this.handleResponse(
      "post",
      "/restaurant/login",
      data,
    );

    if (response.status === "success") {
      const token = response?.data?.credential?.accessToken;
      if (token) saveStore("access_token", token);
    }

    return response;
  };

  restaurantLogout = async () => {
    removeStore("access_token");
    return this.handleResponse("post", "/restaurant/logout");
  };

  getRestaurantProducts = async (restaurantId: string) => {
    return this.handleResponse("get", `/product/restaurant/${restaurantId}`);
  };

  // -------------------------------
  // ADMIN API (TO BE IMPLEMENTED)
  // -------------------------------
}

// Export single instance
export const api = new Api();
