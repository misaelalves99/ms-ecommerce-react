// src/components/favorites/Wishlist.tsx

import React from "react";
import { useWishlist } from '../../hooks/useWishlist';
import styles from "./Wishlist.module.css";
import type { WishlistProduct } from "../../types/wishlist";

const Wishlist: React.FC = () => {
  const { wishlist, removeFromWishlist } = useWishlist();

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Lista de Desejos</h2>

      {wishlist.length === 0 ? (
        <p className={styles.emptyMessage}>Sua lista de desejos está vazia.</p>
      ) : (
        <div className={styles.grid}>
          {wishlist.map((product: WishlistProduct) => (
            <div key={product.id} className={styles.cardHorizontal}>
              <div className={styles.imageSection}>
                <img
                  src={product.imageUrl || "/images/product-placeholder.png"}
                  alt={product.name}
                  width={120}
                  height={120}
                  className={styles.image}
                />
              </div>

              <div className={styles.infoSection}>
                <h3 className={styles.productName}>{product.name}</h3>
                <p className={styles.productDescription}>{product.description}</p>
                <p className={styles.productPrice}>R$ {product.price.toFixed(2)}</p>

                <button
                  onClick={() => removeFromWishlist(Number(product.id))}
                  className={styles.removeButton}
                >
                  Remover da Lista
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
