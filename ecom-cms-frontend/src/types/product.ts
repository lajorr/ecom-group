import { Brand } from "./brand";
import { Category } from "./category";

export type PRODUCT = {
  image: string;
  name: string;
  category: string;
  price: number;
  sold: number;
  profit: number;
};


export type ProductResponse = {
  _id: string;
  name: string;
  category: string;
  brand: string,
  price: string;
  offer_price: string | null;
  description: string | null;
  is_featured: boolean,
  stock: number;
  image: string;
}

export type Product = Omit<ProductResponse, 'brand' | 'category'> & {
  brand?: Brand,
  category?: Category
}