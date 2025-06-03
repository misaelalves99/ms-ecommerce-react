// app/types/product.ts

import { Dispatch, SetStateAction } from "react";

export type Product = {
  id: string | number;
  name: string;
  title?: string;
  price: number;
  oldPrice?: number;
  discount?: number;
  description?: string;
  category: string;
  rating?: number;
  stock?: number;
  image?: string;
  imageUrl?: string;
  images?: string[];
  mainImage?: string;
  createdAt?: string;
  updatedAt?: string;
  [key: string]: unknown;
};

export type ProductContextType = {
  products: Product[];
  setProducts: Dispatch<SetStateAction<Product[]>>;
  loading: boolean;
  error: string;
  fetchProducts: () => void;
};

export type WishlistContextType = {
  wishlist: Product[];
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: number) => void;
  isInWishlist: (productId: number) => boolean;
};
