import React, { useState } from "react";
import styles from "@/styles/components/Artist/ArtistPromo.module.css";
import { ArtistPageProps } from "./ArtistPage";
import Image from "next/image";
import YouTubeEmbed from "../User/YouTubeIFrame";

const ArtistPromo: React.FC<ArtistPageProps> = ({ artist }) => {
  const [showPhotos, setShowPhotos] = useState(true); // состояние для отслеживания отображения фотографий/видео
  const handleShowPhotos = () => {
    setShowPhotos(true);
  };

  const handleShowVideos = () => {
    setShowPhotos(false);
  };

  return (
    <div className={styles.artistPromo}>
      <div className={styles.artistPromoContainer}>
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
            <div className={styles.artistPromoHeaderText}>₴{artist.price}</div>
            <div>
              <p className={styles.artistPromoHeaderLocationTitle}>Місто</p>
              <div className={styles.artistPromoHeaderLocation}>
                {artist.location.split(",")[0]}{" "}
                {/* Вывод первого слова из текста */}
              </div>
            </div>
          </div>
        </div>
        <div>
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
            Фідео
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
                  artist.photo.map((item) => (
                    <li
                      key={item.publicId}
                      className={styles.photoListItem}>
                      <Image
                        src={item.url}
                        alt={"user photo"}
                        fill
                        sizes="(min-width: 808px) 50vw, 100vw"
                        className={styles.photo}
                      />
                    </li>
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
                      <YouTubeEmbed url={item.url} />
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
