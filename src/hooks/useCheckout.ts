// src/hooks/useCheckout.ts

import { useContext } from "react";
import { CheckoutContext, type CheckoutContextType } from "../context/CheckoutContext";

export const useCheckout = (): CheckoutContextType => {
  const context = useContext(CheckoutContext);
  if (!context) {
    throw new Error("useCheckout deve ser usado dentro de um CheckoutProvider");
  }
  return context;
};
