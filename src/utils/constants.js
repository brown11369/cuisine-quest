const baseURL = import.meta.env.VITE_BACKEND_PUBLIC_URL
export const STRIP_KEY = import.meta.env.VITE_STRIPE_KEY

// URL Version
const URL = baseURL + "/api/v2"


// generate access token
export const POST_ACCESS_TOKEN = `${URL}/access-token/generate/`;


// user auth
export const POST_USER_REGISTER = `${URL}/user/register`;
export const POST_USER_LOGIN = `${URL}/user/login`;
export const POST_USER_LOGOUT = `${URL}/user/logout`;


// product
export const GET_ALL_product = `${URL}/product/all`;
export const GET_ALL_PUBLISHED_product = `${URL}/product/published`;
export const GET_ALL_RESTAURANT = `${URL}/restaurant/all`;


// cart
export const POST_ADD_ITEM = `${URL}/cart/add`;
export const POST_UPDATE_QUANTITY = `${URL}/cart/quantity/`
export const GET_CART_ITEMS = `${URL}/cart/items/`
export const DELETE_CART_ITEM = `${URL}/cart/remove/`;

// checkout
export const POST_CHECKOUT = `${URL}/checkout/create-session`
