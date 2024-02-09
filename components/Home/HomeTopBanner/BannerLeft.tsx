import React from "react";
import styles from "@/styles/Home/HomeTopBanner/BannerLeft.module.css";
import Link from "next/link";
import { Comfortaa } from "next/font/google";
const comfortaa = Comfortaa({ weight: ["400"], subsets: ["latin"] });

const BannerLeft = () => {
  return (
    <div className={comfortaa.className}>
      <div className={styles.bannerContainer}>
        <p className={styles.bannerTitle}>
          Організуй захід самостійно в три дії
        </p>
        <ul className={styles.bannerList}>
          <li className={styles.bannerListItem}>
            1 Розмісти запит, про пошук “спеціаліста”
          </li>
          <li className={styles.bannerListItem}>
            2 Активуй чат-Бот, для отримання відгуків на запит
          </li>
          <li className={styles.bannerListItem}>3 Чекай свого “спеціаліста”</li>
          <div className={styles.buttonContainer}>
            {" "}
            <Link
              className={styles.submitButton}
              href={"/request"}>
              Розмісти запит
            </Link>
          </div>
        </ul>
      </div>
    </div>
  );
};

export default BannerLeft;
