// src/pages/ProductPage.tsx

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useCart } from "../../hooks/useCart";
import ProductDetails from "../../components/product-list/ProductDetails";
import styles from "./ProductPage.module.css";
import { Product } from "../../types/product";
import { getProducts } from "../../lib/api/products";

interface CartItem {
  id: string;
  productId: number | string;
  name: string;
  price: number;
  imageUrl: string;
  quantity: number;
  product: Product;
}

const ProductPage: React.FC = () => {
  const params = useParams<{ id?: string }>();
  const productId = params.id;

  const { addToCart } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const loadProduct = async (productId: string) => {
      try {
        const allProducts = await getProducts();
        const foundProduct = allProducts.find((p) => String(p.id) === productId);

        if (!foundProduct) {
          throw new Error("Produto não encontrado");
        }

        setProduct(foundProduct);
      } catch (err) {
        setError("Erro ao carregar o produto");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (!productId) {
      setError("ID do produto ausente na URL.");
      setLoading(false);
      return;
    }

    loadProduct(productId);
  }, [productId]);

  if (loading) return <div className={styles.loading}>Carregando produto...</div>;
  if (error) return <div className={styles.error}>{error}</div>;
  if (!product) return <div className={styles.error}>Produto não encontrado.</div>;

  const handleAddToCart = (product: Product) => {
    const cartItem: CartItem = {
      id: String(product.id),
      productId: product.id,
      name: product.name,
      price: product.price,
      imageUrl: product.imageUrl ?? "",
      quantity: 1,
      product: product,
    };
    addToCart(cartItem);
  };

  return (
    <div className={styles.container}>
      <ProductDetails product={product} onAddToCart={handleAddToCart} />
    </div>
  );
};

export default ProductPage;
