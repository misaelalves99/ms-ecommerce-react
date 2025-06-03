import { Product } from './product';

export interface Checkout {
    products: Product[];
    totalPrice: number;
    shippingAddress: string;
    billingAddress: string;
    paymentMethod: 'credit' | 'debit' | 'paypal';
}

export interface CheckoutData {
    fullName: string;
    email: string;
    address: string;
    city: string;
    postalCode: string;
    paymentMethod: 'creditCard' | 'boleto' | 'paypal';
    cardNumber?: string;
    expirationDate?: string;
    cvv?: string;
}
export interface CheckoutForm {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  zipCode: string;
  paymentMethod: "credit_card" | "boleto" | "pix";
}

export type CheckoutContextType = {
  form: CheckoutForm;
  setForm: (form: CheckoutForm) => void;
};
