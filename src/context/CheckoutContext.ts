// src/context/CartContext.ts

import { createContext } from "react";
import { CheckoutForm } from "../types/checkout";

export type CheckoutContextType = {
  form: CheckoutForm;
  setForm: (form: CheckoutForm) => void;
};

export const CheckoutContext = createContext<CheckoutContextType | undefined>(undefined);
