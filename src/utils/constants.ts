const baseURL = import.meta.env.VITE_BACKEND_PUBLIC_URL;
const apiVersion = import.meta.env.VITE_API_VERSION;
export const STRIP_KEY = import.meta.env.VITE_STRIPE_KEY;

// URL Version
const URL = baseURL + apiVersion;

// generate access token
export const POST_ACCESS_TOKEN = `${URL}/access-token/generate/`;

// user auth
export const POST_USER_REGISTER = `${URL}/user/registers`;
export const POST_USER_LOGIN = `${URL}/user/logins`;
export const POST_USER_LOGOUT = `${URL}/user/logout`;

// product
export const GET_ALL_product = `${URL}/product/all`;
export const GET_ALL_PUBLISHED_product = `${URL}/product/published`;
export const GET_ALL_RESTAURANT = `${URL}/restaurant/all`;

// cart
// export const POST_ADD_ITEM = `${URL}/cart/add`;
// export const POST_UPDATE_QUANTITY = `${URL}/cart/quantity/`;
// export const GET_CART_ITEMS = `${URL}/cart/items/`;
export const DELETE_CART_ITEM = `${URL}/cart/remove/`;

// checkout
export const POST_CHECKOUT_SESSION = `${URL}/checkout/create-session`;
export const PATCH_CHECKOUT_COMPLETE = `${URL}/checkout/complete/`;
export const PATCH_CHECKOUT_CANCEL = `${URL}/checkout/cancel/`;

// orders
export const GET_ORDERS = `${URL}/order/`;

//restaurant
export const POST_RESTAURANT_REGISTER = `${URL}/restaurant/register`;
export const POST_RESTAURANT_LOGIN = `${URL}/restaurant/login`;
export const POST_RESTAURANT_LOGOUT = `${URL}/restaurant/logout`;

export const GET_RESTAURANT_PRODUCTS = `${URL}/product/restaurant/`;
