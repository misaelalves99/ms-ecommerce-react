// src/context/WishlistContext.ts

import { createContext } from "react";
import { Product } from "../types/product";

export type WishlistContextType = {
  wishlist: Product[];
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: number) => void;
  isInWishlist: (productId: number) => boolean;
};

export const WishlistContext = createContext<WishlistContextType | undefined>(undefined);
