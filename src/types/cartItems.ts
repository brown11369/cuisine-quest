import type { IProduct } from "./products";

export interface ICartItem {
  _id: string;
  user: string;
  product: IProduct;
  quantity: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
