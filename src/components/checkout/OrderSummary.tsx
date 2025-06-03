// src/components/checkout/OrderSummary.tsx

import React from 'react';
import { Product } from '../../types/product';
import type { ShippingOption } from '../../types/shipping';
import styles from './OrderSummary.module.css';
import CheckoutActions from './CheckoutActions';

interface Props {
  product: Product;
  quantity: number;
  onQuantityChange: (type: 'increment' | 'decrement') => void;
  selectedShipping: ShippingOption;
  onGoToPayment: () => void;
}

const OrderSummary: React.FC<Props> = ({
  product,
  quantity,
  onQuantityChange,
  selectedShipping,
  onGoToPayment,
}) => {
  const total = product.price * quantity + selectedShipping.price;
  const totalPix = total - total * 0.05;

  return (
    <div className={styles.orderSummary}>
      <h2>Resumo do pedido</h2>
      <div className={styles.summaryItem}>
        <div className={styles.productInfo}>
          {product.imageUrl && (
            <img
              src={product.imageUrl}
              alt={product.name}
              width={80}
              height={80}
              className={styles.summaryImage}
              style={{ objectFit: 'cover' }}
            />
          )}
          <p className={styles.summaryProductName}>{product.name}</p>
        </div>
        <div className={styles.quantityControl}>
          <button onClick={() => onQuantityChange('decrement')}>-</button>
          <span>{quantity}</span>
          <button onClick={() => onQuantityChange('increment')}>+</button>
        </div>
      </div>

      <div className={styles.summarySubtotal}>
        <span>Subtotal ({quantity} Produto{quantity > 1 ? 's' : ''})</span>
        <span>
          {(product.price * quantity).toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          })}
        </span>
      </div>

      <div className={styles.summaryShipping}>
        <span>Entrega</span>
        <span>
          {selectedShipping.price > 0
            ? selectedShipping.price.toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              })
            : 'Grátis'}
        </span>
      </div>

      <div className={styles.summaryTotal}>
        <span>Total</span>
        <span>
          {total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
        </span>
      </div>

      <div className={styles.paymentInfo}>
        <p>
          ou {totalPix.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} à
          vista no Pix
        </p>
      </div>

      <CheckoutActions
        type="button"
        className={styles.goToPaymentButton}
        onClick={onGoToPayment}
      >
        Finalizar Compra
      </CheckoutActions>
    </div>
  );
};

export default OrderSummary;
