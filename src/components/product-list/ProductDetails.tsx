// src/components/product-list/ProductDetails.tsx

import React, { useState, useContext } from 'react';
import { Product } from '../../types/product';
import { useNavigate } from 'react-router-dom';
import styles from './ProductDetails.module.css';
import {
  AiOutlineShareAlt,
  AiFillStar
} from 'react-icons/ai';
import { FaHeart } from 'react-icons/fa';
import { AuthContext } from '../../context/AuthContext';
import { useWishlist } from '../../hooks/useWishlist';

interface ProductDetailsProps {
  product: Product;
  oldPrice?: number;
}

const ProductDetails: React.FC<ProductDetailsProps> = ({ product, oldPrice }) => {
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  if (!authContext) throw new Error('AuthContext não encontrado');
  const { user } = authContext;

  const [mainImage, setMainImage] = useState(
    product.imageUrl ||
    'https://cdn.pixabay.com/photo/2019/10/25/06/15/headphone-4576092_1280.jpg'
  );

  const handleBuyNow = () => {
    navigate(`/checkout/${product.id}`);
  };

  const handleThumbnailClick = (imageUrl: string) => {
    setMainImage(imageUrl);
  };

  const toggleFavorite = () => {
    if (!user) {
      navigate('/login');
      return;
    }

    const productId = Number(product.id);
    if (isInWishlist(productId)) {
      removeFromWishlist(productId);
    } else {
      addToWishlist(product);
    }
  };

  const handleShare = () => {
    console.log('Compartilhar produto');
  };

  const formatPrice = (price: number | undefined): string | undefined => {
    if (price === undefined) return undefined;
    return price.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  return (
    <div className={styles.productDetails}>
      <div className={styles.imageGallery}>
        <div className={styles.mainImageWrapper}>
          <img
            src={mainImage}
            alt={product.name}
            width={500}
            height={500}
            className={styles.productImage}
          />
          <div className={styles.imageActions}>
            <button
              className={styles.favoriteButton}
              onClick={toggleFavorite}
              aria-label={
                isInWishlist(Number(product.id))
                  ? 'Remover dos favoritos'
                  : 'Adicionar aos favoritos'
              }
              title={
                isInWishlist(Number(product.id))
                  ? 'Remover dos favoritos'
                  : 'Adicionar aos favoritos'
              }
            >
              <FaHeart
                size={22}
                color={isInWishlist(Number(product.id)) ? '#ff4d4f' : '#ccc'}
              />
            </button>

            <button
              className={styles.shareButton}
              onClick={handleShare}
              aria-label="Compartilhar"
              title="Compartilhar"
            >
              <AiOutlineShareAlt size={22} />
            </button>
          </div>
        </div>

        <div className={styles.thumbnails}>
          {(product.images && product.images.length > 0 ? product.images : [product.imageUrl])
            .filter((img): img is string => typeof img === 'string')
            .map((img, index) => (
              <div
                key={index}
                className={`${styles.thumbnailWrapper} ${
                  mainImage === img ? styles.activeThumbnail : ''
                }`}
                onClick={() => handleThumbnailClick(img)}
              >
                <img
                  src={img}
                  alt={`Miniatura ${index + 1}`}
                  width={80}
                  height={80}
                  className={styles.thumbnailImage}
                />
              </div>
            ))}
        </div>
      </div>

      <div className={styles.details}>
        <h1 className={styles.productName}>{product.name}</h1>

        <div className={styles.ratingAndReviews}>
          <div className={styles.rating}>
            <AiFillStar color="#ffc107" size={16} />
            <AiFillStar color="#ffc107" size={16} />
            <AiFillStar color="#ffc107" size={16} />
            <AiFillStar color="#ffc107" size={16} />
            <AiFillStar color="grey" size={16} />
            <span className={styles.ratingValue}>4.0</span>
          </div>
          <span className={styles.reviewCount}>(15 avaliações)</span>
        </div>

        {oldPrice && <p className={styles.oldPrice}>{formatPrice(oldPrice)}</p>}
        {product.oldPrice && <p className={styles.oldPrice}>{formatPrice(product.oldPrice)}</p>}

        <p className={styles.productPrice}>{formatPrice(product.price)}</p>

        <div className={styles.discount}>
          <span className={styles.discountPercentage}>13% OFF</span>
        </div>

        <div className={styles.paymentOptions}>
          <span>Ver mais opções de pagamento</span>
        </div>

        <div className={styles.buttonGroup}>
          <button
            className={styles.buyButton}
            onClick={handleBuyNow}
            title="Comprar agora"
          >
            Comprar
          </button>
        </div>

        <div className={styles.shippingCalculator}>
          <label htmlFor="cep" className={styles.shippingLabel}>
            Calcular frete e prazo de entrega:
          </label>
          <div className={styles.shippingInput}>
            <input
              type="text"
              id="cep"
              placeholder="Digite seu CEP"
              className={styles.cepInput}
            />
            <button className={styles.calculateButton}>Calcular</button>
          </div>
        </div>

        <div className={styles.productFeatures}>
          <span className={styles.viewFeatures}>Ver características do produto</span>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
