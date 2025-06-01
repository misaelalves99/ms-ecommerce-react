// src/context/CartContext.ts

import { createContext } from "react";
import { Product } from "../types/product";
import { CartItem } from "../types/cart";

export interface CartContextType {
  cartItems: CartItem[];
  addToCart: (item: CartItem) => void;
  incrementFromCart: (product: Product) => void;
  decrementFromCart: (productId: string | number) => void;
  removeFromCart: (productId: string | number) => void;
  clearCart: () => void;
  cartTotal: number;
}

export const CartContext = createContext<CartContextType | undefined>(undefined);
