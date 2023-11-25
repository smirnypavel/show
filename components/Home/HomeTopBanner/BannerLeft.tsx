import React from "react";
import styles from "@/styles/Home/HomeTopBanner/BannerLeft.module.css";

const BannerLeft = () => {
  return (
    <div className={styles.bannerContainer}>
      <p className={styles.bannerTitle}>Організуй захід самостійно в три дії</p>
      <ul className={styles.bannerList}>
        <li className={styles.bannerListItem}>
          1 Розмісти запит, про пошук “спеціаліста”
        </li>
        <li className={styles.bannerListItem}>
          2 Активуй чат-Бот, для отримання відгуків на запит
        </li>
        <li className={styles.bannerListItem}>3 Чекай свого “спеціаліста”</li>
      </ul>
    </div>
  );
};

export default BannerLeft;
