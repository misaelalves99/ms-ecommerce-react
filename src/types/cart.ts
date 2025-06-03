// app/types/cart.ts

import { Product } from "./product";

export interface Cart {
  items: CartItem[];
  total: number;
}

export interface CartState {
  items: CartItem[];
  totalAmount: number;
}
export interface CartItem {
  id: string | number;
  productId: string | number;
  name: string;
  price: number;
  imageUrl?: string;
  quantity: number;
  product: Product;
  category?: string;
}

export interface CartItemType {
  id: string | number;
  name: string;
  price: number;
  quantity: number;
  imageUrl?: string;
  category?: string;
}

export type CartAction =
  | { type: "ADD_ITEM"; item: CartItem }
  | { type: "REMOVE_ITEM"; productId: string | number }
  | { type: "INCREMENT_ITEM"; product: Product }
  | { type: "DECREMENT_ITEM"; productId: string | number }
  | { type: "ADD_TO_CART"; payload: CartItem }
  | { type: "REMOVE_FROM_CART"; payload: { productId: number } }
  | { type: "CLEAR_CART" };

export interface CartContextType {
  cartItems: CartItem[];
  addToCart: (item: CartItem) => void;
  incrementFromCart: (product: Product) => void;
  decrementFromCart: (productId: string | number) => void;
  removeFromCart: (productId: string | number) => void;
  clearCart: () => void;
  cartTotal: number;
}
