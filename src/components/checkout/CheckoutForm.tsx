// src/components/checkout/CheckoutForm.tsx

import React, { useState } from 'react';
import { useCart } from '../../hooks/useCart';
import { CheckoutData } from '../../types/checkout';
import styles from './CheckoutForm.module.css';
import CheckoutActions from './CheckoutActions';

interface CheckoutFormProps {
  onSubmit: (data: CheckoutData) => void;
}

const CheckoutForm: React.FC<CheckoutFormProps> = ({ onSubmit }) => {
  const { cartItems } = useCart();

  const [formData, setFormData] = useState<CheckoutData>({
    fullName: '',
    email: '',
    address: '',
    city: '',
    postalCode: '',
    paymentMethod: 'creditCard',
    cardNumber: '',
    expirationDate: '',
    cvv: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Dados do pedido:', formData, cartItems);
    onSubmit(formData);
  };

  const creditCardFields: (keyof Pick<
    CheckoutData,
    'cardNumber' | 'expirationDate' | 'cvv'
  >)[] = ['cardNumber', 'expirationDate', 'cvv'];

  return (
    <section className={styles.checkoutFormSection}>
      <h2 className={styles.sectionTitle}>Dados para entrega (opcional)</h2>

      <form onSubmit={handleSubmit} className={styles.formContainer}>
        {/* Método de pagamento */}
        <div className={styles.formGroup}>
          <label htmlFor="paymentMethod" className={styles.label}>
            Método de Pagamento
          </label>
          <select
            id="paymentMethod"
            name="paymentMethod"
            value={formData.paymentMethod}
            onChange={handleChange}
            className={styles.selectField}
          >
            <option value="creditCard">Cartão de Crédito</option>
            <option value="boleto">Boleto Bancário</option>
            <option value="paypal">PayPal</option>
          </select>
        </div>

        {/* Informações do cartão se for creditCard */}
        {formData.paymentMethod === 'creditCard' && (
          <div className={styles.paymentSection}>
            <h3 className={styles.paymentTitle}>Informações de Cartão</h3>
            {creditCardFields.map((field) => (
              <div key={field} className={styles.paymentGroup}>
                <label htmlFor={field} className={styles.label}>
                  {field === 'cvv'
                    ? 'CVV'
                    : field === 'cardNumber'
                    ? 'Número do Cartão'
                    : 'Data de Expiração'}
                </label>
                <input
                  type="text"
                  id={field}
                  name={field}
                  value={formData[field] || ''}
                  onChange={handleChange}
                  className={styles.inputField}
                />
              </div>
            ))}
          </div>
        )}

        <CheckoutActions type="submit" className={styles.submitButton}>
          Finalizar Compra
        </CheckoutActions>
      </form>
    </section>
  );
};

export default CheckoutForm;
