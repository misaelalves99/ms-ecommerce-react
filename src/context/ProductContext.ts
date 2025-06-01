// src/context/ProductContext.ts

import { createContext, type Dispatch, type SetStateAction } from "react";
import { Product } from "../types/product";

export type ProductContextType = {
  products: Product[];
  setProducts: Dispatch<SetStateAction<Product[]>>;
  loading: boolean;
  error: string;
  fetchProducts: () => void;
};

export const ProductContext = createContext<ProductContextType | undefined>(undefined);
