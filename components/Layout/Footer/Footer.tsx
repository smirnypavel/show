import React from "react";
import styles from "@/styles/Layout/Footer/Footer.module.css";
import Link from "next/link";

const Footer = () => {
  return (
    <div className={styles.footer}>
      <div className={styles.containerMap}>
        <div>
          <h3 className={styles.title}>Пошукачу</h3>
          <ul>
            <li>
              <Link
                href={"/"}
                className={styles.link}>
                Головна
              </Link>
            </li>
            <li>
              <Link
                href={"/"}
                className={styles.link}>
                Пошук Артистів
              </Link>
            </li>
            <li>
              <Link
                href={"/"}
                className={styles.link}>
                Як створити запит?
              </Link>
            </li>
            <li>
              <Link
                href={"/"}
                className={styles.link}>
                Як користуватись Ботом при пошуку
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h3 className={styles.title}>Артисту</h3>
          <ul>
            <li>
              <Link
                href={"/"}
                className={styles.link}>
                Як зареєструватись
              </Link>
            </li>
            <li>
              <Link
                href={"/profile"}
                className={styles.link}>
                Особистий кабінет
              </Link>
            </li>
            <li>
              <Link
                href={"/profile/update"}
                className={styles.link}>
                Налаштувати профіль
              </Link>
            </li>
            <li>
              <Link
                href={"/"}
                className={styles.link}>
                Як користуватись Ботом артисту
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h3 className={styles.title}>Wechirka.com</h3>
          <ul>
            <li>
              <Link
                href={"/about"}
                className={styles.link}>
                Про компанію
              </Link>
            </li>
            <li>
              <a
                href="/public/privacy/privacy_offer.pdf"
                target="_blank"
                className={styles.link}>
                Конфіденційність
              </a>
            </li>
            <li>
              <Link
                href={"/"}
                className={styles.link}>
                Написати в підтримку
              </Link>
            </li>
            <li>
              <Link
                href={"/"}
                className={styles.link}>
                Умови користування
              </Link>
            </li>
            <li>
              <Link
                href={"/"}
                className={styles.link}>
                Договір публічної оферти
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h3 className={styles.title}>Куточок</h3>
          <ul>
            <li>
              <Link
                href={"/blog"}
                className={styles.link}>
                Користні статті
              </Link>
            </li>
            <li>
              <Link
                href={"/"}
                className={styles.link}>
                YouTube Wechirka
              </Link>
            </li>
            <li>
              <Link
                href={"/"}
                className={styles.link}>
                Реклама
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Footer;
