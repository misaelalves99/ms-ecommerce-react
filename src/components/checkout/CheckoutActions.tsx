// src/components/checkout/CheckoutActions.tsx

import React from 'react';
import styles from './CheckoutActions.module.css';

interface CheckoutActionsProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

const CheckoutActions: React.FC<CheckoutActionsProps> = ({ children, type = 'button', className, ...rest }) => {
  return (
    <div className={styles.actions}>
      <button type={type} className={className} {...rest}>
        {children}
      </button>
    </div>
  );
};

export default CheckoutActions;
