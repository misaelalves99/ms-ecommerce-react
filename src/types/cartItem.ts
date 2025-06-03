import { Product } from "./product";

export interface CartItem {
  id: string;
  productId: number | string;
  name: string;
  price: number;
  imageUrl: string;
  quantity: number;
  product: Product;
}
