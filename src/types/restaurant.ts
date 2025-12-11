import type { IProduct } from "./products";

export interface IRestaurant {
  _id: string;
  name: string;
  email: string;
  accessToken: string | null;
}

export interface LoginResponse {
  success: boolean;
  message: string;
  credential: IRestaurant;
}

export interface IRestaurantRegisterData {
  name: string;
  email: string;
  contact: string;
  shippingAddress: string;
  password: string;
}

export interface IRestaurantProductResponse {
  success: boolean;
  data?: IProduct[];
}

export interface Address {
  street: string;
  city: string;
  state: string;
  country: string;
  pin: string;
}

export interface IRestaurantDetails {
  _id: string;
  name: string;
  email: string;
  contact: string;
  ownerName: string;
  open: string;
  close: string;
  imageURL: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  isBlocked: boolean;
  address: Address;
}
