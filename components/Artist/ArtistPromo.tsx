import React, { useState } from "react";
import styles from "@/styles/components/Artist/ArtistPromo.module.css";
import { ArtistPageProps } from "./ArtistPage";
import Image from "next/image";
import Modal from "@/components/helpers/Modal";
import { IoIosArrowForward } from "react-icons/io";
import YouTube2 from "../helpers/Youtube";
import MobileInfoPage from "./Mobile/MobileInfoPage";
import { GrLocation } from "react-icons/gr";
import { TbCurrencyHryvnia } from "react-icons/tb";

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
    <>
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
          <h1 className={styles.title}>{artist.title}</h1>
          <p className={styles.paragraph}>
            <GrLocation className={styles.icon} />{" "}
            {artist.location.split(",")[0]}{" "}
          </p>
          <p className={styles.paragraph}>
            <TbCurrencyHryvnia className={styles.icon} /> {artist.price}
          </p>
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
        </div>
        <div className={styles.bottomContainer}></div>
      </div>
    </>
  );
};

export default ArtistPromo;
