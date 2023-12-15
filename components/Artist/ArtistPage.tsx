import { IUserAuth } from "@/types/IAuth";
import styles from "@/styles/components/Artist/ArtistPage.module.css";
import React, { useState } from "react";
import Image from "next/image";
import { HiOutlinePhone } from "react-icons/hi";
import { SiMaildotru, SiWhatsapp, SiTelegram, SiViber } from "react-icons/si";

export interface ArtistPageProps {
  artist: IUserAuth;
}

const ArtistPage: React.FC<ArtistPageProps> = ({ artist }) => {
  const [showContact, setShowContact] = useState(false);
  const handleShowContact = () => {
    setShowContact(!showContact);
  };

  return (
    <div className={styles.artistContainer}>
      <div className={styles.artistPromo}></div>
      <div className={styles.artistInfo}>
        <div className={styles.artistInfoContainer}>
          <div className={styles.artistAvatarContainer}>
            <Image
              src={artist.avatar.url} // Assuming 'avatar' has a 'url' property of type string
              alt={artist.title}
              fill
              className={styles.image}
              sizes="(min-width: 808px) 50vw, 100vw"
            />
          </div>
          <div className={styles.artistName}>{artist.firstName}</div>
        </div>
        <button
          onClick={handleShowContact}
          className={styles.contactButton}>
          Показати контакти
        </button>
        {showContact && (
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
              <SiWhatsapp className={styles.contactIcon} />
              {artist.whatsapp}
            </a>
            <a
              href={`https://t.me/${artist.telegram}`}
              target="_blank"
              className={styles.contactItem}>
              <SiTelegram className={styles.contactIcon} />
              {artist.telegram}
            </a>
            <a
              href={`viber://chat?number=${artist.viber}`}
              target="_blank"
              className={styles.contactItem}>
              <SiViber className={styles.contactIcon} />
              {artist.viber}
            </a>
          </div>
        )}
        <div className={styles.artistSocial}>
          <a
            href="https://www.instagram.com/"
            target="_blank"
            className={styles.contactItem}>
            Instagram
          </a>
          <a
            href="https://www.facebook.com/"
            target="_blank"
            className={styles.contactItem}>
            Facebook
          </a>
          <a
            href="https://www.youtube.com/"
            target="_blank"
            className={styles.contactItem}>
            Youtube
          </a>
        </div>
      </div>
    </div>
  );
};

export default ArtistPage;
