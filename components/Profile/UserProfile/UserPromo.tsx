import React, { useState } from "react";
import styles from "@/styles/components/Profile/Profile/UserPromo.module.css";
import { ArtistPageProps } from "./UserProfile";
import Image from "next/image";
import Modal from "@/components/helpers/Modal";
import { IoIosArrowForward } from "react-icons/io";
import YouTube2 from "../../helpers/Youtube";
import MobileInfoPage from "./Mobile/MobileUserInfo";
import { GrLocation } from "react-icons/gr";
import { TbCurrencyHryvnia } from "react-icons/tb";
import {
  PiTiktokLogoThin,
  PiInstagramLogoThin,
  PiFacebookLogoThin,
  PiYoutubeLogoThin,
  PiGlobeThin,
  PiWhatsappLogoThin,
  PiTelegramLogoThin,
  PiPhoneThin,
  PiStarThin,
} from "react-icons/pi";
import { SiViber } from "react-icons/si";

import { Comfortaa } from "next/font/google";

import { SiMaildotru } from "react-icons/si";
import YouTube3 from "@/components/helpers/Youtube2";
import ShareLink from "@/components/helpers/ShareLink";

const comfortaa = Comfortaa({ weight: ["400"], subsets: ["latin"] });

const ArtistPromo: React.FC<ArtistPageProps> = ({ artist }) => {
  const [showPhotos, setShowPhotos] = useState(true); // состояние для отслеживания отображения фотографий/видео
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalOpenIndex, setModalOpenIndex] = useState<number | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleShowPhotos = () => {
    setShowPhotos(true);
  };

  const handleShowVideos = () => {
    setShowPhotos(false);
  };
  const openModal = (index: number) => {
    setModalOpenIndex(index);
  };

  const closeModal = () => {
    setModalOpenIndex(null);
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className={comfortaa.className}>
      <div className={styles.container}>
        <div>
          <div className={styles.imageContainer}>
            <Image
              src={artist.master_photo.url}
              alt="MasterPhoto"
              fill
              className={styles.image}
            />
            <div className={styles.gradient}></div>
          </div>
        </div>
        <div className={styles.artistInfo}>
          <div className={styles.artistTitleContainer}>
            <div className={styles.avatarContainer}>
              <Image
                src={artist.avatar.url}
                alt="avatar"
                fill
                className={styles.avatar}
              />
            </div>
            <h2 className={styles.artistName}>{artist.firstName}</h2>
          </div>
          <div className={styles.infoTopContainer}>
            <div>
              <h1 className={styles.title}>{artist.title}</h1>
              <p className={styles.paragraph}>
                <GrLocation className={styles.icon} />{" "}
                {artist.location.split(",")[0]}{" "}
              </p>
              <p className={styles.paragraph}>
                <TbCurrencyHryvnia className={styles.icon} /> {artist.price}
              </p>
              <p className={styles.label}>Рейтинг</p>
              <div className={styles.ratingContainer}>
                <PiStarThin className={styles.iconRating} />{" "}
                <PiStarThin className={styles.iconRating} />{" "}
                <PiStarThin className={styles.iconRating} />{" "}
                <PiStarThin className={styles.iconRating} />{" "}
                <PiStarThin className={styles.iconRating} />
              </div>
            </div>
            <ShareLink />
            <div className={styles.artistContact}>
              <p className={styles.label}>Контакти</p>

              <div className={styles.contactsContainer}>
                {artist.phone && (
                  <a
                    href={`tel:${artist.phone}`}
                    className={styles.contactItem}>
                    <PiPhoneThin className={styles.icon} />
                    {artist.phone}
                  </a>
                )}
                {artist.email && (
                  <a
                    href={`mailto:${artist.email}`}
                    className={styles.contactItem}>
                    <SiMaildotru className={styles.icon} />
                    <span className={styles.spanMail}>{artist.email}</span>
                  </a>
                )}

                {artist.whatsapp && (
                  <a
                    href={`https://wa.me/${artist.whatsapp}`}
                    target="_blank"
                    className={styles.contactItem}>
                    <PiWhatsappLogoThin className={styles.icon} />
                    {artist.whatsapp}
                  </a>
                )}
                {artist.telegram && (
                  <a
                    href={`https://t.me/${artist.telegram}`}
                    target="_blank"
                    className={styles.contactItem}>
                    <PiTelegramLogoThin className={styles.icon} />
                    {artist.telegram}
                  </a>
                )}
                {artist.telegram && (
                  <a
                    href={`viber://chat?number=${artist.viber}`}
                    target="_blank"
                    className={styles.contactItem}>
                    <SiViber className={styles.icon} />
                    {artist.viber}
                  </a>
                )}
              </div>
            </div>
          </div>
          <div className={styles.descriptionContainer}>
            <h4 className={styles.label}>Опис</h4>
            <p className={styles.description}> {artist.description}</p>
          </div>
          <h5 className={styles.label}>Категорії</h5>
          <div className={styles.categoryList}>
            {artist.category.length === 0 ? (
              <div className={styles.categoryArtist}>Категорії не обрані</div>
            ) : (
              artist.category.map((cat) =>
                cat.subcategories.map((subCat) => (
                  <div
                    className={styles.categoryItem}
                    key={subCat.id}>
                    {subCat.name}
                  </div>
                ))
              )
            )}
          </div>
          <p className={styles.label}>Лінки</p>
          <div className={styles.artistSocial}>
            {artist && artist.social && artist.social.Instagram && (
              <a
                href={artist.social.Instagram}
                target="_blank"
                className={styles.artistSocialItem}>
                {" "}
                <PiInstagramLogoThin className={styles.artistSocialItem} />
              </a>
            )}
            {artist && artist.social && artist.social.Facebook && (
              <a
                href={artist.social.Facebook}
                target="_blank"
                className={styles.artistSocialItem}>
                <PiFacebookLogoThin className={styles.artistSocialItem} />
              </a>
            )}
            {artist && artist.social && artist.social.Youtube && (
              <a
                href={artist.social.Youtube}
                target="_blank"
                className={styles.artistSocialItem}>
                <PiYoutubeLogoThin className={styles.artistSocialItem} />
              </a>
            )}
            {artist && artist.social && artist.social.TikTok && (
              <a
                href={artist.social.TikTok}
                target="_blank"
                className={styles.artistSocialItem}>
                <PiTiktokLogoThin className={styles.artistSocialItem} />
              </a>
            )}
            {artist && artist.social && artist.social.WebSite && (
              <a
                href={artist.social.WebSite}
                target="_blank"
                className={styles.artistSocialItem}>
                <PiGlobeThin className={styles.artistSocialItem} />
              </a>
            )}
          </div>{" "}
        </div>
        <div className={styles.bottomContainer}>
          <div className={styles.buttonsContainer}>
            <button
              onClick={handleShowPhotos}
              className={
                showPhotos
                  ? `${comfortaa.className} ${styles.portfolioButton} ${styles.portfolioButtonActive}`
                  : `${comfortaa.className} ${styles.portfolioButton} `
              }>
              Фото
            </button>
            <button
              onClick={handleShowVideos}
              className={
                !showPhotos
                  ? ` ${comfortaa.className} ${styles.portfolioButton} ${styles.portfolioButtonActive}`
                  : `${comfortaa.className} ${styles.portfolioButton} `
              }>
              Відео
            </button>
          </div>
          <div>
            {showPhotos ? (
              <div className={styles.portfolioContainer}>
                <ul className={styles.photoListContainer}>
                  {artist.photo.length === 0 ? (
                    <div className={styles.categoryArtist}>
                      Фото виступівне не додане
                    </div>
                  ) : (
                    artist.photo.map((item, index) => (
                      <div key={item.publicId}>
                        <li className={styles.photoListItem}>
                          <Image
                            src={item.url}
                            alt={"user photo"}
                            fill
                            sizes="(min-width: 808px) 50vw, 100vw"
                            className={styles.photo}
                            onClick={() => openModal(index)}
                          />
                        </li>
                        {modalOpenIndex === index && (
                          <Modal onClose={closeModal}>
                            <li className={styles.photoBigItem}>
                              <Image
                                src={item.url}
                                alt={"user photo"}
                                fill
                                sizes="(min-width: 808px) 50vw, 100vw"
                                className={styles.photo}
                              />
                            </li>
                          </Modal>
                        )}
                      </div>
                    ))
                  )}
                </ul>
              </div>
            ) : (
              <div className={styles.videoContainer}>
                <ul className={styles.videoListContainer}>
                  {artist.video.length === 0 ? (
                    <div className={styles.categoryArtist}>
                      Відео з YouTube не додане
                    </div>
                  ) : (
                    artist.video.map((item) => (
                      <li
                        key={item.publicId}
                        className={styles.videoListItem}>
                        <div className={styles.video}>
                          <YouTube2 url={item.url} />
                        </div>
                        <div className={styles.videoMobile}>
                          <YouTube3 url={item.url} />
                        </div>
                      </li>
                    ))
                  )}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtistPromo;
