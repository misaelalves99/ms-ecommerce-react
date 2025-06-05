// src/components/product-list/ProductCard.tsx

import React, { useContext } from "react";
import { FaCartPlus, FaHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../../context/CartContext";
import { AuthContext } from "../../context/AuthContext";
import { useWishlist } from "../../hooks/useWishlist";
import { Product } from "../../types/product";
import { CartItem } from "../../types/cart";
import styles from "./ProductCard.module.css";

interface ProductCardProps {
  product: Product;
  onBuyNow?: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const cartContext = useContext(CartContext);
  const authContext = useContext(AuthContext);
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const navigate = useNavigate();

  if (!cartContext) throw new Error("CartContext não encontrado");
  if (!authContext) throw new Error("AuthContext não encontrado");

  const { addToCart } = cartContext;
  const { user } = authContext;

  const handleAddToCart = () => {
    if (!user) {
      navigate("/login");
      return;
    }

    const cartItem: CartItem = {
      id: Number(product.id),
      productId: Number(product.id),
      name: product.name,
      price: product.price,
      imageUrl: product.imageUrl,
      quantity: 1,
      product: product,
    };

    addToCart(cartItem);
  };

  const handleBuyNow = () => {
    if (user) {
      // Se logado, adiciona ao carrinho antes de navegar
      const cartItem: CartItem = {
        id: Number(product.id),
        productId: Number(product.id),
        name: product.name,
        price: product.price,
        imageUrl: product.imageUrl,
        quantity: 1,
        product: product,
      };

      addToCart(cartItem);
    }

    // Navega para a página do produto de qualquer forma
    navigate(`/products/${product.id}`);
  };

  const toggleWishlist = () => {
    if (!user) {
      navigate("/login");
      return;
    }
    const productId = Number(product.id);
    if (isInWishlist(productId)) {
      removeFromWishlist(productId);
    } else {
      addToWishlist(product);
    }
  };

  const goToProduct = () => {
    navigate(`/products/${product.id}`);
  };

  return (
    <div className={styles.card}>
      <div
        className={styles.favoriteIcon}
        onClick={toggleWishlist}
        title={
          isInWishlist(Number(product.id))
            ? "Remover dos favoritos"
            : "Adicionar aos favoritos"
        }
        style={{ cursor: "pointer" }}
      >
        <FaHeart
          size={18}
          color={isInWishlist(Number(product.id)) ? "#ff4d4f" : "#ccc"}
        />
      </div>

      <div
        className={styles.imageWrapper}
        onClick={goToProduct}
        style={{ cursor: "pointer" }}
      >
        <img
          src={product.imageUrl || "/images/product-placeholder.png"}
          alt={product.name}
          width={300}
          height={300}
          className={styles.productImage}
        />
      </div>

      <div className={styles.details}>
        <h3
          className={styles.productName}
          onClick={goToProduct}
          style={{ cursor: "pointer" }}
        >
          {product.name}
        </h3>
        <p className={styles.productDescription}>{product.description}</p>
        <p className={styles.productPrice}>R$ {product.price.toFixed(2)}</p>

        <div className={styles.buttonGroup}>
          <button
            className={styles.cartButton}
            onClick={handleAddToCart}
            title="Adicionar ao carrinho"
          >
            <FaCartPlus size={20} />
          </button>
          <button className={styles.buyButton} onClick={handleBuyNow}>
            Comprar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
