import React, { useState } from "react";
import styles from "@/styles/components/Artist/ArtistPromo.module.css";
import { ArtistPageProps } from "./ArtistPage";
import Image from "next/image";
import Modal from "@/components/helpers/Modal";
import { IoIosArrowForward } from "react-icons/io";
import YouTube2 from "../helpers/Youtube";
import MobileInfoPage from "./Mobile/MobileInfoPage";

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
    <div className={styles.artistPromo}>
      <div className={styles.artistPromoContainer}>
        <button
          className={styles.buttonContact}
          onClick={toggleMenu}>
          Контакти
        </button>
        <div className={`${styles.mobileInfo} ${menuOpen && styles.show}`}>
          <button
            className={styles.buttonClose}
            onClick={toggleMenu}>
            <IoIosArrowForward className={styles.buttonCloseIcon} />
          </button>
          <MobileInfoPage artist={artist} />
        </div>
        <div className={styles.artistPromoHeader}>
          <div className={styles.artistPromoMasterPhoto}>
            <Image
              src={artist.master_photo.url}
              alt="artist master_photo"
              fill
              className={styles.image}
              sizes="(min-width: 808px) 50vw, 100vw"
            />
          </div>
          <div className={styles.artistPromoHeaderTextContainer}>
            <div className={styles.artistPromoHeaderText}>{artist.title}</div>
            <div className={styles.artistPromoHeaderText}>₴ {artist.price}</div>
            <div>
              <p className={styles.artistPromoHeaderLocationTitle}>Місто</p>
              <div className={styles.artistPromoHeaderLocation}>
                {artist.location.split(",")[0]}{" "}
                {/* Вывод первого слова из текста */}
              </div>
            </div>
          </div>
        </div>
        <div className={styles.descriptionContainer}>
          <div className={styles.descriptionWrapper}>
            {artist.description
              ? artist.description
              : "Напишіть про те чим ви займаетесь, для того щоб корістувачам було зручніше Вас знайти"}
          </div>
        </div>
        <div>
          <p className={styles.categoryTitle}>Категорії надання послуг</p>
          <div className={styles.categoryContainer}>
            {artist.category.length === 0 ? (
              <div className={styles.categoryArtist}>Категорії не обрані</div>
            ) : (
              artist.category.map((cat) => (
                <div
                  className={styles.categoryArtist}
                  key={cat._id}>
                  {cat.name}
                </div>
              ))
            )}
          </div>
          <p className={styles.categoryTitle}>Підкатегорія</p>

          <div className={styles.categoryContainer}>
            {artist.category.length === 0 ? (
              <div className={styles.categoryArtist}>
                Підкатегорії не обрані
              </div>
            ) : (
              artist.category.map((cat) =>
                cat.subcategories.map((subCat) => (
                  <div
                    className={styles.categoryArtist}
                    key={subCat.id}>
                    {subCat.name}
                  </div>
                ))
              )
            )}
          </div>
        </div>
        <p className={styles.portfolioTitle}>Портфоліо</p>
        <div className={styles.buttonsContainer}>
          <button
            onClick={handleShowPhotos}
            className={
              showPhotos
                ? `${styles.portfolioButton} ${styles.portfolioButtonActive}`
                : styles.portfolioButton
            }>
            Фото
          </button>
          <button
            onClick={handleShowVideos}
            className={
              !showPhotos
                ? `${styles.portfolioButton} ${styles.portfolioButtonActive}`
                : styles.portfolioButton
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
                      {/* <YouTube url={item.url} /> */}
                      <YouTube2 url={item.url} />
                    </li>
                  ))
                )}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ArtistPromo;
