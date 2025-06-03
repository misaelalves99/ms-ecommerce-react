// src/components/checkout/ShippingOptions.tsx

import React from 'react';
import styles from './ShippingOptions.module.css';
import type { ShippingOption } from '../../types/shipping';

interface Props {
  selectedShipping: ShippingOption;
  onSelect: (option: ShippingOption) => void;
}

const mockShippingOptions: ShippingOption[] = [
  { id: 'normal', name: 'Normal', price: 0, deliveryTime: '15 de maio, quinta' },
  { id: 'rapido', name: 'Retirar Rápido', price: 0, deliveryTime: 'Retirar em 2h' },
];

const ShippingOptions: React.FC<Props> = ({ selectedShipping, onSelect }) => (
  <section className={styles.shippingOptions}>
    <h2>Escolha a entrega</h2>
    {mockShippingOptions.map((option) => (
      <div
        key={option.id}
        className={`${styles.shippingOption} ${selectedShipping.id === option.id ? styles.selected : ''}`}
        onClick={() => onSelect(option)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onSelect(option);
          }
        }}
      >
        <input
          type="radio"
          id={option.id.toString()}
          name="shipping"
          value={option.id.toString()}
          checked={selectedShipping.id === option.id}
          onChange={() => onSelect(option)}
        />
        <label htmlFor={option.id.toString()}>
          <span className={styles.shippingName}>{option.name}</span>
          <span className={styles.deliveryTime}>{option.deliveryTime}</span>
          <span className={styles.shippingPrice}>
            {option.price > 0
              ? option.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
              : 'Grátis'}
          </span>
        </label>
      </div>
    ))}
  </section>
);

export default ShippingOptions;
