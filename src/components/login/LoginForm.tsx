// src/components/login/LoginForm.tsx

import React, { useState } from "react";
import { FaGoogle, FaFacebookF, FaInstagram } from "react-icons/fa";
import { useAuth } from '../../hooks/useAuth';
import styles from "./LoginForm.module.css";
import FormInput from "./FormInput";

interface LoginFormProps {
  onSubmit?: (email: string, password: string) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSubmit }) => {
  const { login } = useAuth();

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!formData.email || !formData.password) {
      setError("Preencha todos os campos.");
      setLoading(false);
      return;
    }

    try {
      if (onSubmit) {
        onSubmit(formData.email, formData.password);
        setLoading(false);
        return;
      }

      await login(formData.email, formData.password);

      alert("Login realizado com sucesso!");
      
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message || "Erro ao fazer login.");
      } else {
        setError("Erro inesperado ao fazer login.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = (platform: string) => {
    alert(`Login com ${platform} ainda não implementado.`);
  };

  return (
    <div className={styles.container}>
      <div className={styles.formWrapper}>
        <h2 className={styles.title}>Entrar</h2>
        <p className={styles.subtitle}>Bem-vindo de volta! Entre com seu e-mail e senha.</p>

        <form onSubmit={handleSubmit} className={styles.form}>
          <FormInput
            label="Email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Digite seu e-mail"
          />

          <FormInput
            label="Senha"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Digite sua senha"
          />

          {error && <div className={styles.errorMessage}>{error}</div>}

          <a href="/recover-password" className={styles.link}>
            Esqueceu a senha?
          </a>

          <button type="submit" className={styles.button} disabled={loading}>
            {loading ? "Entrando..." : "Entrar"}
          </button>
        </form>

        <div className={styles.links}>
          <p className={styles.registerLink}>
            Não tem uma conta?{" "}
            <a href="/register" className={styles.link}>
              Cadastre-se
            </a>
          </p>
        </div>

        <div className={styles.divider}>ou entre com</div>
        <div className={styles.socialButtons}>
          <button type="button" className={styles.google} onClick={() => handleSocialLogin("Google")}>
            <FaGoogle className={styles.icon} />
          </button>
          <button type="button" className={styles.facebook} onClick={() => handleSocialLogin("Facebook")}>
            <FaFacebookF className={styles.icon} />
          </button>
          <button type="button" className={styles.instagram} onClick={() => handleSocialLogin("Instagram")}>
            <FaInstagram className={styles.icon} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
