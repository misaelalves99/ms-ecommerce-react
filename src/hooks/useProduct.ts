// src/hooks/useProduct.ts

import { useContext } from "react";
import { ProductContext } from "../context/ProductContext";
import type { ProductContextType } from "../types/product";

export const useProduct = (): ProductContextType => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useProduct deve ser usado dentro de um ProductProvider");
  }
  return context;
};
