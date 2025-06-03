// src/hooks/useWishlist.ts

import { useContext } from "react";
import { WishlistContext } from "../context/WishlistContext";
import type { WishlistContextType } from "../types/product";

export const useWishlist = (): WishlistContextType => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error("useWishlist deve ser usado dentro de um WishlistProvider");
  }
  return context;
};
