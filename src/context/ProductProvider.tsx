// src/context/ProductProvider.tsx

import { useState, useEffect, type ReactNode } from "react";
import { ProductContext } from "../context/ProductContext";
import { getProducts } from "../lib/api/products";
import type { Product } from "../types/product";

type ProductProviderProps = {
  children: ReactNode;
};

export const ProductProvider = ({ children }: ProductProviderProps) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const fetchedProducts = await getProducts();
      setProducts(fetchedProducts);
      setError("");
    } catch (err) {
      console.error("Erro ao buscar produtos:", err);
      setError("Erro ao carregar produtos.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <ProductContext.Provider
      value={{ products, setProducts, loading, error, fetchProducts }}
    >
      {children}
    </ProductContext.Provider>
  );
};
