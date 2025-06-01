// src/pages/recover-password/index.tsx

import React from 'react';
import RecoverPasswordForm from '../../components/login/RecoverPasswordForm';
import styles from './RecoverPasswordPage.module.css';

const RecoverPasswordPage: React.FC = () => {
  return (
    <div className={styles.pageContainer}>
      <h1 className={styles.pageHeader}>Recuperar Senha</h1>
      <RecoverPasswordForm />
    </div>
  );
};

export default RecoverPasswordPage;
