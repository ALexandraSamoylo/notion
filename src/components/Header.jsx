import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Header.module.scss';

const Header = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('userId'); 
    navigate('/'); 
  };

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <Link to="/" className={styles.link}>
          Главная
        </Link>
        <Link to="/about" className={styles.link}>
          О проекте
        </Link>
        <button onClick={handleLogout} className={styles.link}>
          Выйти
        </button>
      </nav>
    </header>
  );
};

export default Header;
