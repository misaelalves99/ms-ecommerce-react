// src/components/login/RecoverPasswordForm.tsx

import React, { useState } from 'react';
import { validateEmail } from '../../utils/validate';
import styles from './RecoverPasswordForm.module.css';
import FormInput from './FormInput';
import { FiArrowLeft } from 'react-icons/fi';

const RecoverPasswordForm: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [message, setMessage] = useState<string>('');

  const handleRecoverPassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateEmail(email)) {
      setMessage('E-mail de recuperação de senha enviado!');
    } else {
      setMessage('Insira um endereço de e-mail válido.');
    }
  };

  const handleGoBack = () => {
    window.history.back();
  };

  return (
    <form onSubmit={handleRecoverPassword} className={styles.formContainer}>
      <div>
        <FormInput
          label="Email"
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
        />
      </div>

      <button type="submit" className={styles.submitButton}>
        Recover Password
      </button>

      <button type="button" onClick={handleGoBack} className={styles.backButton}>
        <FiArrowLeft className={styles.backIcon} />
        Voltar
      </button>

      {message && <p className={styles.message}>{message}</p>}
    </form>
  );
};

export default RecoverPasswordForm;
