// src/pages/carousel/index.tsx

import React from "react";
import Carousel from "../../components/carousel/Carousel";
import styles from "./CarouselPage.module.css";

const CarouselPage: React.FC = () => {
  return (
    <main className={styles.main}>
      <h1 className={styles.title}>Carrossel de Destaques</h1>
      <Carousel />
    </main>
  );
};

export default CarouselPage;
