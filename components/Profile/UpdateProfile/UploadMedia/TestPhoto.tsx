import { deletePhoto, uploadImage } from "@/redux/auth/authOperations";
import { getUserPhoto } from "@/redux/auth/authSelectors";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useRef } from "react";
import styles from "@/styles/components/Profile/UpdateProfile/UpdateMedia/TestPhoto.module.css";
import Image from "next/image";
import React from "react";

import { IoClose } from "react-icons/io5";
import { HiOutlineDownload, HiOutlineStar } from "react-icons/hi";

const emptyImagePlaceholder = "https://via.placeholder.com/250x250";

const PhotoPlaceholderComponent = () => {
  const userPhoto = useAppSelector(getUserPhoto);
  const existingImages = userPhoto.map((photo) => photo.url);
  const emptyImageCount = 5 - existingImages.length;
  const dispatch = useAppDispatch();
  const fileInputRef = useRef<HTMLInputElement>(null);
  console.log(userPhoto);
  const handleButtonClick = () => {
    fileInputRef.current?.click(); // Нажатие на input при клике на кнопку
  };
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]; // Получаем первый файл из FileList
    if (file) {
      dispatch(uploadImage(file)); // Передаем file напрямую
    }
  };
  const handleDeletePhoto = (publicId: string) => {
    console.log(publicId);
    dispatch(deletePhoto({ id: publicId }));
  };
  // Создаем массив с элементами, представляющими места для фото
  const photoPlaceholders = Array.from(
    { length: emptyImageCount },
    (_, index) => (
      <div
        key={`placeholder-${index}`}
        className={styles.imageContainer}>
        <Image
          src={emptyImagePlaceholder}
          alt={"Empty Placeholder"}
          className={styles.image}
          fill
        />
      </div>
    )
  );

  // Если есть фото у пользователя, заменяем пустые заглушки на фотографии
  const photos = userPhoto.map((photo) => (
    <div
      key={photo.publicId}
      className={styles.imageContainer}>
      <Image
        src={photo.url}
        alt={""}
        fill
        loading="lazy"
        className={styles.image}
      />
      <button
        className={styles.deleteButton}
        onClick={() => handleDeletePhoto(photo.publicId)}>
        <IoClose className={styles.deleteButtonIcon} />
      </button>
      <button
        className={styles.favoriteButton}
        // onClick={() => handleDeletePhoto(photo.publicId)}
      >
        <HiOutlineStar className={styles.favoriteButtonIcon} />
      </button>
    </div>
  ));

  // Объединяем места для фото и фотографии пользователя
  const allPhotos = [...photos, ...photoPlaceholders];

  return (
    <div>
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        // disabled={emptyImageCount <= 0}
        // style={{ display: "none" }} // Скрываем стандартный input
      />
      <button
        onClick={handleButtonClick}
        // disabled={emptyImageCount <= 0}
        className={styles.download}>
        <HiOutlineDownload className={styles.downloadIcon} />
        <p className={styles.downloadText}>Загрузити фото</p>
      </button>
      <div className={styles.containerImages}>{allPhotos}</div>
    </div>
  );
};

export default PhotoPlaceholderComponent;
