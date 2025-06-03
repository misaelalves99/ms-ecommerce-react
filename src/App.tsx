// src/App.tsx

import React from "react";
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";

import { AuthProvider, CartProvider, ProductProvider, WishlistProvider, } from "./context";

import HomePage from "./pages/home";
import ProductsPage from "./pages/products";
import ProductPage from "./pages/products/ProductPage";
import LoginPage from "./pages/login";
import RegisterPage from "./pages/register";
import RecoverPasswordPage from "./pages/recover-password";
import CartPage from "./pages/cart";
import FavoritesPage from "./pages/favorites";
import OrdersPage from "./pages/orders";
import CheckoutPage from "./pages/checkout/[productId]";

const App: React.FC = () => {
  return (
    <AuthProvider>
      <CartProvider>
        <ProductProvider>
          <WishlistProvider>
            <Navbar />
            <main style={{ minHeight: "80vh", padding: "1rem" }}>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/products" element={<ProductsPage />} />
                <Route path="/products/:id" element={<ProductPage />} />
                <Route path="/checkout/:productId" element={<CheckoutPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/recover-password" element={<RecoverPasswordPage />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/favorites" element={<FavoritesPage />} />
                <Route path="/orders" element={<OrdersPage />} />
              </Routes>
            </main>
            <Footer />
          </WishlistProvider>
        </ProductProvider>
      </CartProvider>
    </AuthProvider>
  );
};

export default App;
