import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "./Navbar.module.css";
import CartButton from "../cart/CartButton";
import FavoriteButton from "../favorites/FavoriteButton";
import ProfileButton from "../profile/ProfileButton";

const Navbar: React.FC = () => {
  const location = useLocation();
  const [currentPath, setCurrentPath] = useState("");

  useEffect(() => {
    if (location.pathname) {
      setCurrentPath(location.pathname);
    }
  }, [location.pathname]);

  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <Link to="/" className={styles.logo}>
          MS Ecommerce
        </Link>

        <div className={styles.navLinks}>
          <Link
            to="/"
            className={`${styles.link} ${currentPath === "/" ? styles.active : ""}`}
          >
            Home
          </Link>
          <Link
            to="/products"
            className={`${styles.link} ${currentPath === "/products" ? styles.active : ""}`}
          >
            Produtos
          </Link>
          <Link to="/cart" className={styles.link}>
            <CartButton />
          </Link>
          <Link to="/favorites" className={styles.link}>
            <FavoriteButton />
          </Link>
          <ProfileButton />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
