export interface IProduct {
  _id: string;
  restaurant: string;
  name: string;
  description: string;
  category: string;
  price: number;

  features: string[];
  ingredients: string[];

  imageURL: string;
  altTag: string;

  isVegetarian: boolean;
  isVegan: boolean;
  isGlutenFree: boolean;

  status: "published" | "draft" | "archived";

  url: string;
  keywords: string[];

  metaTitle: string;
  metaDescription: string;

  createdAt: string; // ISO Date
  updatedAt: string; // ISO Date

  __v: number;
}
