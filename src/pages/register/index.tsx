// src/pages/register/index.tsx

import React from "react";
import RegisterForm from "../../components/register/RegisterForm";
import styles from "./RegisterPage.module.css";

const RegisterPage: React.FC = () => {
  return (
    <div className={styles.pageContainer}>
      <RegisterForm />
    </div>
  );
};

export default RegisterPage;
