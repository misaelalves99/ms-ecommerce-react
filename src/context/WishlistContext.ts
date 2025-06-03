// src/context/WishlistContext.ts

import { createContext } from "react";
import type { WishlistContextType } from "../types/product";

export const WishlistContext = createContext<WishlistContextType | undefined>(undefined);
