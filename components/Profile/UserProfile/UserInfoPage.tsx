import React, { useState } from "react";
import Image from "next/image";
import styles from "@/styles/components/Profile/Profile/UserProfileInfo.module.css";
import { HiOutlinePhone } from "react-icons/hi";
import { SiMaildotru } from "react-icons/si";
import TelegramLogo from "@/public/icon/TelegramLogo.svg";
import instagram from "@/public/icon/instagram.svg";
import FacebookLogo from "@/public/icon/FacebookLogo.svg";
import ViberLogo from "@/public/icon/ViberLogo.svg";
import YouTubeLogo from "@/public/icon/YouTubeLogo.svg";
import { ArtistPageProps } from "./UserProfile";
import Link from "next/link";

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
          <div className={styles.ratingContainer}>
            <div className={styles.rating}>
              <div>Рейтинг</div>
              <div>5.0</div>
            </div>
            <div className={styles.rating}>
              <div>Виконано замовлень</div>
              <div>10</div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.artistContact}>
        <p className={styles.contactTitle}>Контактні данні</p>
        <a
          href={`tel:${artist.phone}`}
          className={styles.contactItem}>
          <HiOutlinePhone className={styles.contactIcon} />
          {artist.phone}
        </a>
        <a
          href={`mailto:${artist.email}`}
          className={styles.contactItem}>
          <SiMaildotru className={styles.contactIcon} />
          {artist.email}
        </a>
        <p className={styles.contactTitle}>Месенджери</p>
        <a
          href={`https://wa.me/${artist.whatsapp}`}
          target="_blank"
          className={styles.contactItem}>
          {/* <SiWhatsapp className={styles.contactIcon} /> */}
          {artist.whatsapp}
        </a>
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
      </div>
      <p className={styles.contactTitle}>Соціальні сторінки</p>
      <div className={styles.artistSocial}>
        <a
          href="https://www.instagram.com/"
          target="_blank"
          className={styles.artistSocialItem}>
          Instagram{" "}
          <Image
            src={instagram}
            alt="Instagram Logo"
            className={styles.socialIcon}
          />
        </a>
        <a
          href="https://www.facebook.com/"
          target="_blank"
          className={styles.artistSocialItem}>
          Facebook{" "}
          <Image
            src={FacebookLogo}
            alt="Facebook Logo"
            className={styles.socialIcon}
          />
        </a>
        <a
          href="https://www.youtube.com/"
          target="_blank"
          className={styles.artistSocialItem}>
          Youtube{" "}
          <Image
            src={YouTubeLogo}
            alt="YouTube Logo"
            className={styles.socialIcon}
          />
        </a>
      </div>{" "}
      <Link href="/profile/update">Редагувати профіль</Link>
    </div>
  );
};

export default ArtistInfoPage;
