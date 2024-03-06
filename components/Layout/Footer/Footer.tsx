import React, { useState } from "react";
import styles from "@/styles/Layout/Footer/Footer.module.css";
import Link from "next/link";
import Image from "next/image";
import { Comfortaa } from "next/font/google";
const comfortaa = Comfortaa({
  weight: ["300", "400", "700", "500"],
  subsets: ["latin"],
});
import { Kodchasan } from "next/font/google";
const kodchasan = Kodchasan({
  weight: ["300", "400", "700", "500"],
  subsets: ["latin"],
});
import {
  PiTiktokLogoThin,
  PiInstagramLogoThin,
  PiFacebookLogoThin,
  PiYoutubeLogoThin,
  PiTelegramLogoThin,
  PiPhoneThin,
  PiInstagramLogo,
  PiInstagramLogoLight,
  PiYoutubeLogoLight,
  PiFacebookLogoLight,
  PiGooglePlayLogoLight,
  PiAppStoreLogo,
} from "react-icons/pi";
import { LuAtSign } from "react-icons/lu";

const Footer = () => {
  return (
    <div className={`${comfortaa.className} ${styles.footer}`}>
      <div className={styles.containe}>
        <Link
          href={"/"}
          className={styles.logoLink}>
          <div className={styles.logoContainer}>
            <Image
              src={"/logo/logo123.svg"}
              alt={""}
              fill
              className={styles.logo}
            />
          </div>
          <span className={`${kodchasan.className} ${styles.span}`}>
            Wechirka.com
          </span>
        </Link>
        <p className={styles.title}>Wechirka: відкрий новий рівень разваг.</p>
        <p className={styles.socialTitle}>Приєднуйтесь до нашого комьюніті: </p>
        <div className={styles.socialContainer}>
          <Link href={""}>
            <PiFacebookLogoLight className={styles.socialIcon} />
          </Link>
          <Link href={""}>
            <PiYoutubeLogoLight className={styles.socialIcon} />
          </Link>
          <Link href={""}>
            <PiInstagramLogoLight className={styles.socialIcon} />
          </Link>
        </div>
        <p className={styles.title}>Корисні посилання </p>
        <div className={styles.linkContainer}>
          {" "}
          <Link
            href="/privacy/privacy_offer.pdf"
            className={styles.link}
            target="_blank">
            Конфіденційність
          </Link>
          <Link
            href={"/public/public-offer"}
            className={styles.link}
            target="_blank">
            Публічна оферта
          </Link>
        </div>
        <p className={styles.title}>Відгукі та пропозиції </p>
        <div className={styles.socialContainer}>
          <a
            href={`https://t.me/+tG6pSpHWPPFiYzMy`}
            target="_blank">
            <PiTelegramLogoThin className={styles.socialIcon} />
          </a>
          <a
            href={`mailto:support@wechirka.com`}
            target="_blank">
            <LuAtSign className={styles.socialIcon} />
          </a>
        </div>
        <p className={styles.title}>Очікуйте додаток </p>
        <div className={styles.socialContainer}>
          <PiGooglePlayLogoLight className={styles.socialIcon} />
          <PiAppStoreLogo className={styles.socialIcon} />
        </div>
        <div className={styles.separator}></div>
        <p className={styles.backstageText}>
          Ⓒ Створено командою Wechirka 2024
        </p>

        {/* <div>
          <p className={styles.title}>Пошукачу</p>
          <ul>
            <li>
             
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
          <p className={styles.title}>Артисту</p>
          <ul>
            <li>
              <Link
                href={"/public/info-artist"}
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
          <p className={styles.title}>Wechirka.com</p>
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
                href="/privacy/privacy_offer.pdf"
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
                href={"/public/public-offer"}
                className={styles.link}>
                Договір публічної оферти
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <p className={styles.title}>Куточок</p>
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
        </div> */}
      </div>
    </div>
  );
};

export default Footer;
