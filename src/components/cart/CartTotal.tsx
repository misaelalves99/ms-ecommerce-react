// app/components/CartTotal.tsx

import React from 'react';
import { useCart } from '../../hooks/useCart';
import styles from './CartTotal.module.css';

const CartTotal: React.FC = () => {
  const { cartTotal } = useCart();

  return (
    <div className={styles.cartTotalContainer}>
      <h3 className={styles.totalText}>Total: R$ {cartTotal.toFixed(2)}</h3>
    </div>
  );
};

export default CartTotal;
