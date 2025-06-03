// src/pages/checkout/[productId]/index.tsx

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getProducts } from '../../../lib/api/products';
import { CheckoutData } from '../../../types/checkout';
import type { Product } from '../../../types/product';
import type { ShippingOption } from '../../../types/shipping';

import AddressSection from '../../../components/checkout/AddressSection';
import ShippingOptions from '../../../components/checkout/ShippingOptions';
import CheckoutForm from '../../../components/checkout/CheckoutForm';
import OrderSummary from '../../../components/checkout/OrderSummary';

import styles from './CheckoutPage.module.css';

const CheckoutPage: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();

  const [product, setProduct] = useState<Product | null>(null);
  const [checkoutData, setCheckoutData] = useState<CheckoutData | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedShipping, setSelectedShipping] = useState<ShippingOption>({
    id: 'normal',
    name: 'Normal',
    price: 0,
    deliveryTime: '15 de maio, quinta',
  });

  useEffect(() => {
    const fetchProduct = async () => {
      if (!productId) return;

      try {
        const allProducts = await getProducts();
        const found = allProducts.find((p) => String(p.id) === String(productId));

        if (!found) {
          setProduct({
            id: Number(productId),
            name: 'Produto personalizado',
            title: 'Produto personalizado',
            description: 'Este é um produto personalizado criado via checkout direto.',
            price: 99.9,
            priceOld: 129.9,
            discount: 23,
            rating: 4.5,
            category: 'custom',
            images: ['/images/default-product.jpg'],
            mainImage: '/images/default-product.jpg',
          } as Product);
        } else {
          setProduct(found);
        }
      } catch (err) {
        console.error(`Erro ao buscar produto ${productId}:`, err);
        setProduct({
          id: Number(productId),
          name: 'Produto temporário',
          title: 'Produto temporário',
          description: 'Produto carregado com dados padrão devido a erro na API.',
          price: 89.9,
          priceOld: 119.9,
          discount: 25,
          rating: 4.0,
          category: 'erro',
          images: ['/images/default-product.jpg'],
          mainImage: '/images/default-product.jpg',
        } as Product);
      }
    };

    fetchProduct();
  }, [productId]);

  const handleQuantityChange = (type: 'increment' | 'decrement') => {
    setQuantity((prev) => (type === 'increment' ? prev + 1 : Math.max(prev - 1, 1)));
  };

  const handleCheckoutSubmit = (data: CheckoutData) => {
    setCheckoutData(data);
    alert('✅ Dados de entrega recebidos.');
  };

  if (!product) {
    return <div className={styles.checkoutContainer}>Carregando produto...</div>;
  }

  return (
    <div className={styles.checkoutContainer}>
      <div className={styles.checkoutPanel}>
        <AddressSection />
        <ShippingOptions selectedShipping={selectedShipping} onSelect={setSelectedShipping} />
        <CheckoutForm onSubmit={handleCheckoutSubmit} />
      </div>
      <OrderSummary
        product={product}
        quantity={quantity}
        onQuantityChange={handleQuantityChange}
        selectedShipping={selectedShipping}
        onGoToPayment={() => {
          if (!checkoutData) {
            alert('Por favor, preencha seus dados de entrega.');
            return;
          }
          alert('Ir para a página de pagamento (funcionalidade não implementada).');
          console.log({ checkoutData, product, quantity, selectedShipping });
        }}
      />
    </div>
  );
};

export default CheckoutPage;
