// src/components/product-list/ProductList.tsx

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Product } from "../../types/product";
import ProductCard from "./ProductCard";
import styles from "./ProductList.module.css";
import { useCart } from "../../hooks/useCart";
import { CartItem } from "../../types/cart";
import Pagination from "./Pagination";

interface ProductListProps {
  products: Product[];
}

const PRODUCTS_PER_PAGE = 8;

const ProductList: React.FC<ProductListProps> = ({ products }) => {
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(products.length / PRODUCTS_PER_PAGE);

  const handleBuyNow = (product: Product) => {
    const cartItem: CartItem = {
      id: String(product.id),
      productId: product.id,
      name: product.name,
      price: product.price,
      imageUrl: product.imageUrl,
      quantity: 1,
      product,
      category: product.category,
    };
    addToCart(cartItem);
    navigate(`/products/${product.id}`);
  };

  const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
  const selectedProducts = products.slice(startIndex, startIndex + PRODUCTS_PER_PAGE);

  if (!products.length) {
    return <p className={styles.noProductsMessage}>Nenhum produto encontrado.</p>;
  }

  return (
    <>
      <div className={styles.productGrid}>
        {selectedProducts.map((product) => (
          <ProductCard key={product.id} product={product} onBuyNow={handleBuyNow} />
        ))}
      </div>

      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
    </>
  );
};

export default ProductList;
