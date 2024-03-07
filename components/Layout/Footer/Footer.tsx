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
  weight: ["500"],
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
      <div className={styles.container}>
        <div>
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
          <p className={styles.socialTitle}>
            Приєднуйтесь до нашого комьюніті:{" "}
          </p>
          <div className={styles.socialContainer}>
            <Link
              target="_blank"
              href={"https://www.facebook.com/profile.php?id=61556196121327"}>
              <PiFacebookLogoLight className={styles.socialIcon} />
            </Link>
            <Link
              target="_blank"
              href={"https://www.youtube.com/channel/UCGimb06BfAc_QwaBMiEY91g"}>
              <PiYoutubeLogoLight className={styles.socialIcon} />
            </Link>
            <Link
              target="_blank"
              href={
                "https://www.instagram.com/wechirka?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
              }>
              <PiInstagramLogoLight className={styles.socialIcon} />
            </Link>
          </div>
        </div>
        <div>
          <p className={styles.title}>Корисні посилання </p>
          <div className={styles.linkContainer}>
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
        </div>
        <div>
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
        </div>
        <div>
          <p className={styles.title}>Очікуйте додаток </p>
          <div className={styles.socialContainer}>
            <PiGooglePlayLogoLight className={styles.socialIcon} />
            <PiAppStoreLogo className={styles.socialIcon} />
          </div>
        </div>
      </div>
      <div className={styles.separator}></div>
      <p className={styles.backstageText}>Ⓒ Створено командою Wechirka 2024</p>
    </div>
  );
};

export default Footer;
