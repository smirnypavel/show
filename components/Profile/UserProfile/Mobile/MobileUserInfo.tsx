import React, { useState } from "react";
import Image from "next/image";
import styles from "@/styles/components/Profile/Profile/Mobile/MobileUserInfo.module.css";
import { HiOutlinePhone } from "react-icons/hi";
import { SiMaildotru } from "react-icons/si";
import TelegramLogo from "@/public/icon/TelegramLogo.svg";
import instagram from "@/public/icon/instagram.svg";
import FacebookLogo from "@/public/icon/FacebookLogo.svg";
import ViberLogo from "@/public/icon/ViberLogo.svg";
import YouTubeLogo from "@/public/icon/YouTubeLogo.svg";
import { ArtistPageProps } from "../UserProfile";
import Link from "next/link";
import WhatsApp from "@/public/icon/WhatsApp.svg";
import tiktokApp from "@/public/icon/tiktokApp.svg";
import { CgWebsite } from "react-icons/cg";
const ArtistInfoPage: React.FC<ArtistPageProps> = ({ artist }) => {
  const [showContact, setShowContact] = useState(false);
  const handleShowContact = () => {
    setShowContact(!showContact);
  };
  return (
    <div className={styles.artistInfo}>
      <div className={styles.artistInfoContainer}>
        <div className={styles.artistAvatarContainer}>
          <Image
            src={artist.avatar.url}
            alt={artist.title}
            fill
            className={styles.image}
            sizes="(min-width: 808px) 50vw, 100vw"
          />
        </div>
        <div>
          <div className={styles.artistName}>{artist.firstName}</div>
          <div className={styles.rating}>
            <div>Рейтинг</div>
            <div>5.0</div>
          </div>
        </div>
      </div>
      <div className={styles.artistContact}>
        <p className={styles.contactTitle}>Контактні данні</p>
        {artist.phone && (
          <a
            href={`tel:${artist.phone}`}
            className={styles.contactItem}>
            <HiOutlinePhone className={styles.contactIcon} />
            {artist.phone}
          </a>
        )}
        {artist.email && (
          <a
            href={`mailto:${artist.email}`}
            className={styles.contactItem}>
            <SiMaildotru className={styles.contactIcon} />
            {artist.email}
          </a>
        )}

        <p className={styles.contactTitle}>Месенджери</p>
        {artist.whatsapp && (
          <a
            href={`https://wa.me/${artist.whatsapp}`}
            target="_blank"
            className={styles.contactItem}>
            {/* <SiWhatsapp className={styles.contactIcon} /> */}{" "}
            <Image
              src={WhatsApp}
              alt="WhatsApp Logo"
              className={styles.contactIcon}
            />
            {artist.whatsapp}
          </a>
        )}
        {artist.telegram && (
          <a
            href={`https://t.me/${artist.telegram}`}
            target="_blank"
            className={styles.contactItem}>
            {/* <SiTelegram className={styles.contactIcon} /> */}
            <Image
              src={TelegramLogo}
              alt="Telegram Logo"
              className={styles.contactIcon}
            />
            {artist.telegram}
          </a>
        )}
        {artist.telegram && (
          <a
            href={`viber://chat?number=${artist.viber}`}
            target="_blank"
            className={styles.contactItem}>
            {/* <SiViber className={styles.contactIcon} /> */}
            <Image
              src={ViberLogo}
              alt="Viber Logo"
              className={styles.contactIcon}
            />
            {artist.viber}
          </a>
        )}
      </div>
      <p className={styles.contactTitle}>Соціальні сторінки</p>
      <div className={styles.artistSocial}>
        {artist && artist.social && artist.social.Instagram && (
          <a
            href={artist.social.Instagram}
            target="_blank"
            className={styles.artistSocialItem}>
            {" "}
            <Image
              src={instagram}
              alt="Instagram Logo"
              className={styles.socialIcon}
            />
            Instagram{" "}
          </a>
        )}
        {artist && artist.social && artist.social.Facebook && (
          <a
            href={artist.social.Facebook}
            target="_blank"
            className={styles.artistSocialItem}>
            <Image
              src={FacebookLogo}
              alt="Facebook Logo"
              className={styles.socialIcon}
            />
            Facebook{" "}
          </a>
        )}
        {artist && artist.social && artist.social.Youtube && (
          <a
            href={artist.social.Youtube}
            target="_blank"
            className={styles.artistSocialItem}>
            {" "}
            <Image
              src={YouTubeLogo}
              alt="YouTube Logo"
              className={styles.socialIcon}
            />
            Youtube{" "}
          </a>
        )}
        {artist && artist.social && artist.social.TikTok && (
          <a
            href={artist.social.TikTok}
            target="_blank"
            className={styles.artistSocialItem}>
            {" "}
            <Image
              src={tiktokApp}
              alt="tiktokApp Logo"
              className={styles.socialIcon}
            />
            Tik Tok{" "}
          </a>
        )}
        {artist && artist.social && artist.social.WebSite && (
          <a
            href={artist.social.WebSite}
            target="_blank"
            className={styles.artistSocialItem}>
            <CgWebsite className={styles.socialIconWeb} />
            Мій Вебсайт
          </a>
        )}
      </div>{" "}
    </div>
  );
};

export default ArtistInfoPage;
