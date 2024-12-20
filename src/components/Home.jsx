import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import styles from './Home.module.scss';

const Home = () => {
  const dispatch = useDispatch();

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Добро пожаловать в Notion!</h1>
      <p className={styles.description}>
        Управляйте своими заметками легко и быстро.
      </p>
      <div className={styles.buttonGroup}>
        <Link to="/login" className={styles.loginButton}>
          Войти
        </Link>
        <Link to="/register" className={styles.registerButton}>
          Регистрация
        </Link>
      </div>
    </div>
  );
};

export default Home;
