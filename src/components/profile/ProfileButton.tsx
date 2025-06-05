// src/components/profile/ProfileButton.tsx

import React, { useState, useRef, useEffect, useContext } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import styles from './ProfileButton.module.css';
import { AuthContext } from '../../context/AuthContext';

const ProfileButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const auth = useContext(AuthContext);

  if (!auth) {
    throw new Error("AuthContext não está disponível. Verifique se o AuthProvider envolve o componente.");
  }

  const { user, logout } = auth;

  const handleRegister = () => {
    navigate('/register');
    setIsOpen(false);
  };

  const handleLogout = () => {
    logout();
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div ref={wrapperRef} className={styles.dropdownWrapper}>
      <button
        className={styles.profileButton}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <FaUserCircle className={styles.icon} />
      </button>

      {isOpen && (
        <div className={styles.dropdownMenu}>
          {!user ? (
            <button onClick={handleRegister} className={styles.menuItem}>
              Cadastro/Login
            </button>
          ) : (
            <button onClick={handleLogout} className={styles.menuItem}>
              Sair
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default ProfileButton;
