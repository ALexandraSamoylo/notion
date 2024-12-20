import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUser } from '../redux/actions';
import { z } from 'zod';
import styles from './Register.module.scss';

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({});
  const [registrationError, setRegistrationError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validate = () => {
    const schema = z
      .object({
        email: z.string().email('Неверный формат email'),
        password: z
          .string()
          .min(8, 'Пароль должен быть не менее 8 символов')
          .regex(/[A-Z]/, 'Пароль должен содержать заглавную букву')
          .regex(/[a-z]/, 'Пароль должен содержать строчную букву')
          .regex(/[0-9]/, 'Пароль должен содержать цифру'),
        confirmPassword: z.string(),
      })
      .refine((data) => data.password === data.confirmPassword, {
        message: 'Пароли не совпадают',
        path: ['confirmPassword'],
      });

    try {
      schema.parse(formData);
      setErrors({});
      return true;
    } catch (err) {
      setErrors(err.formErrors.fieldErrors);
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const response = await fetch('http://localhost:5000/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          createdAt: Date.now(),
        }),
      });

      if (!response.ok) {
        throw new Error('Ошибка регистрации');
      }

      const newUser = await response.json();
      localStorage.setItem('userId', newUser.id);
      dispatch(setUser(newUser));
      navigate('/home');
    } catch (error) {
      setRegistrationError(error.message);
    }
  };

  return (
    <div className={styles.registerContainer}>
      <h2 className={styles.title}>Регистрация</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={styles.input}
          />
          {errors.email && <p className={styles.error}>{errors.email}</p>}
        </div>
        <div className={styles.formGroup}>
          <label>Пароль</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className={styles.input}
          />
          {errors.password && <p className={styles.error}>{errors.password}</p>}
        </div>
        <div className={styles.formGroup}>
          <label>Повтор пароля</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className={styles.input}
          />
          {errors.confirmPassword && (
            <p className={styles.error}>{errors.confirmPassword}</p>
          )}
        </div>
        {registrationError && (
          <p className={styles.error}>{registrationError}</p>
        )}
        <button type="submit" className={styles.submitButton}>
          Зарегистрироваться
        </button>
      </form>
    </div>
  );
};

export default Register;
