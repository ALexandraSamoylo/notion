import React from 'react';
import styles from './About.module.scss';

const About = () => {
  return (
    <div className={styles.container}>
      <h1>О проекте</h1>
      <p>
        Этот проект создан в рамках обучения веб-разработки в БГУ 2024 г
      
      </p>
      <p>Работу выполнила Самойло Александра</p>
    </div>
  );
};

export default About;
