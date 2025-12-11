import type { ICartItem } from "./cartItems";
import type { IProduct } from "./products";

export interface IOrderData {
  user: string;
  items: ICartItem[];
  totalItems: number;
  totalPrice: number;
}

export interface IOrder {
  _id: string;
  user: string;
  items: Array<{
    product: string;
    quantity: number;
  }>;
  totalAmount: number;
  status: "pending" | "completed" | "cancelled";
  createdAt: string;
  updatedAt: string;
}

// shipped order interface

export interface OrderItem {
  product: IProduct;
  quantity: number;
  _id: string;
}

export interface IShippedOrder {
  _id: string;
  user: string;
  paymentInfo: string;
  status: number;
  items: OrderItem[];
  totalItems: number;
  totalPrice: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
