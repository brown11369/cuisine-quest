import axios, { type AxiosInstance } from "axios";
import { queryClient } from "./queryClient";
import { is } from "../utils/is";

export interface IAPIResponse {
  status: "success" | "error";
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: any;
  message?: string;
}

const baseURL = import.meta.env.VITE_BACKEND_URL;
const timeOut = Number(import.meta.env.VITE_API_TIMEOUT) || 50000;

class Api {
  instance: AxiosInstance;
  retryCount = 0;

  constructor() {
    this.instance = axios.create({
      baseURL,
      timeout: timeOut,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    this.instance.interceptors.request.use(async (config) => {
      const accessToken = `await loadStore("access_token")`;
      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
      return config;
    });

    this.instance.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;
        // && !originalRequest._retry you can add this condition to prevent infinite loops
        if (error.response && error.response.status === 401) {
          originalRequest._retry = true;
          this.retryCount++;
          if (this.retryCount < 5) {
            try {
              const newIdToken = await this.refreshToken();

              // completely fresh request
              const retryConfig = {
                ...originalRequest,
                headers: {
                  ...originalRequest.headers,
                  Authorization: `Bearer ${newIdToken}`,
                },
              };

              // reset retry count on successful refresh
              this.retryCount = 0;

              // request with fresh config
              return axios(retryConfig);
            } catch (refreshError) {
              console.error("Error refreshing tokens:", refreshError);
            }
          }

          // If we've exceeded retry count or refresh failed
          this.retryCount = 0;
          // rootStore.user.logout();
          return Promise.reject(
            "Authentication failed after multiple attempts",
          );
        }

        const errorMessage =
          error.response?.data?.message ||
          error.response?.data?.detail ||
          error.message ||
          "An unknown error occurred";
        return Promise.reject(errorMessage);
      },
    );
  }

  handleResponse = async (
    method: "get" | "post" | "put" | "delete",
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
    // FastAPI errors use 'detail' field, fallback to 'message' for other APIs
    const message = data.detail || data.message || "An error occurred";

    if (is.dev) {
      console.info("API response:", response);
    }

    if (status >= 200 && status < 300) {
      return {
        status: "success",
        data,
      };
    } else {
      return {
        status: "error",
        message,
      };
    }
  };

  refreshToken = async () => {
    try {
      // const account =
      //   msalInstance.getActiveAccount() || msalInstance.getAllAccounts()[0];
      // if (!account) throw new Error("No account found. Please login.");
      // const silentRequest: SilentRequest = {
      //   scopes: ["openid", "User.Read", "Mail.Send"],
      //   account: account,
      //   forceRefresh: true,
      // };
      // const tokenResponse: AuthenticationResult =
      //   await msalInstance.acquireTokenSilent(silentRequest);
      // const idToken = tokenResponse?.idToken;
      // const accessToken = tokenResponse?.accessToken;
      // if (!idToken) {
      //   throw new Error("No ID token received from MSAL");
      // }
      // await saveStore("access_token", idToken);
      // await saveStore("refresh_token", idToken);
      // await saveStore("act_access_token", accessToken);
      // return idToken;
    } catch (error) {
      console.error("Silent token acquisition failed", error);
      throw error;
    }
  };

  // Public methods
  // setTokens = async (access: string, refresh: string) => {
  // await saveStore("access_token", access);
  // await saveStore("refresh_token", refresh);
  // };

  clearTokens = async () => {
    // await saveStore("access_token", "");
    // await saveStore("refresh_token", "");
  };

  login = async (user: { email: string; password: string }) => {
    console.log("loginData", user);
    return this.handleResponse("post", "/user/login", user);
  };
  register = async (user: {
    name: string;
    email: string;
    password: string;
    contact: string;
    shippingAddress: string;
    address?: string;
  }) => {
    console.log("registerData", user);
    return this.handleResponse("post", "/user/register", user);
  };
}

export const api = new Api();
