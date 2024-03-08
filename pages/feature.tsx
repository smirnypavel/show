import React from "react";
import styles from "@/styles/Feature/Feature.module.css";
import { GiJetpack, GiSatelliteCommunication } from "react-icons/gi";
import { FaRocket, FaRobot } from "react-icons/fa";

const Feature = () => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>Наші особливості</h1>
        <p className={styles.description}>
          Високотехнологічні можливості нашого продукту переносять вас в світ
          майбутнього.
        </p>
        <ul className={styles.featureList}>
          <li className={styles.featureItem}>
            <FaRocket className={styles.icon} /> Експрес-доставка в будь-яку
            точку галактики
          </li>
          <li className={styles.featureItem}>
            <GiJetpack className={styles.icon} /> Персональний космічний ранець
            для швидкої доставки
          </li>
          <li className={styles.featureItem}>
            <GiSatelliteCommunication className={styles.icon} /> Глобальна
            мережа спілкування з усіма жителями галактики
          </li>
          <li className={styles.featureItem}>
            <FaRobot className={styles.icon} /> Штучний інтелект для оптимізації
            кожного вашого кроку
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Feature;
