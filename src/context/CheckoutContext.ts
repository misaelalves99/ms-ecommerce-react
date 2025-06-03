// src/context/CartContext.ts

import { createContext } from "react";
import type { CheckoutContextType } from "../types/checkout";

export const CheckoutContext = createContext<CheckoutContextType | undefined>(undefined);
