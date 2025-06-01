// src/context/CheckoutProvider.tsx

import { useState, type ReactNode } from "react";
import { CheckoutContext } from "../context/CheckoutContext";
import { CheckoutForm } from "../types/checkout";

type CheckoutProviderProps = {
  children: ReactNode;
};

export const CheckoutProvider = ({ children }: CheckoutProviderProps) => {
  const [form, setForm] = useState<CheckoutForm>({
    name: "",
    address: "",
    paymentMethod: "credit_card",
  });

  return (
    <CheckoutContext.Provider value={{ form, setForm }}>
      {children}
    </CheckoutContext.Provider>
  );
};
