import {
  deletePhoto,
  updateUser,
  uploadImage,
} from "@/redux/auth/authOperations";
import { getUser, getUserPhoto, isLoading } from "@/redux/auth/authSelectors";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useRef } from "react";
import styles from "@/styles/components/Profile/UpdateProfile/UpdateMedia/TestPhoto.module.css";
import Image from "next/image";
import React from "react";
import NoPhoto_PNG from "@/public/user/NoPhoto_PNG.png";
import { IoClose } from "react-icons/io5";
import { HiOutlineDownload, HiOutlineStar } from "react-icons/hi";
import { IPhoto } from "@/types/IAuth";
import { RiLoader2Line } from "react-icons/ri";

// const emptyImagePlaceholder = "https://via.placeholder.com/250x250";

const PhotoPlaceholderComponent = () => {
  const userPhoto = useAppSelector(getUserPhoto);
  const user = useAppSelector(getUser);
  const loading = useAppSelector(isLoading);
  const existingImages = userPhoto.map((photo) => photo.url);
  const emptyImageCount = 5 - existingImages.length;
  const dispatch = useAppDispatch();
  const fileInputRef = useRef<HTMLInputElement>(null);

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
  const handleAddMasterPhoto = (photo: IPhoto) => {
    console.log(photo);
    dispatch(updateUser({ master_photo: photo }));
  };
  // Создаем массив с элементами, представляющими места для фото
  const photoPlaceholders = Array.from(
    { length: emptyImageCount },
    (_, index) => (
      <div
        key={`placeholder-${index}`}
        className={styles.imageContainer}>
        <Image
          src={NoPhoto_PNG}
          alt={"Empty Placeholder"}
          className={styles.image}
          fill
          sizes="(min-width: 808px) 50vw, 100vw"
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
        sizes="(min-width: 808px) 50vw, 100vw"
      />
      <button
        className={styles.deleteButton}
        onClick={() => handleDeletePhoto(photo.publicId)}>
        <IoClose className={styles.deleteButtonIcon} />
      </button>
      {photo.publicId !== user.master_photo.publicId && (
        <button
          className={styles.favoriteButton}
          onClick={() => handleAddMasterPhoto(photo)}>
          <HiOutlineStar className={styles.favoriteButtonIcon} />
        </button>
      )}
    </div>
  ));

  // Объединяем места для фото и фотографии пользователя
  const allPhotos = [...photos, ...photoPlaceholders];

  return (
    <div className={styles.container}>
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        ref={fileInputRef}
        disabled={emptyImageCount <= 0}
        style={{ display: "none" }}
      />
      <button
        onClick={handleButtonClick}
        disabled={emptyImageCount <= 0 || loading} // Добавить состояние загрузки в условие активации кнопки
        className={styles.download}>
        {loading ? ( // Использовать состояние uploading для отображения иконки загрузки
          <RiLoader2Line className={styles.uploadIcon} />
        ) : (
          <HiOutlineDownload className={styles.downloadIcon} />
        )}
        <p className={styles.downloadText}>Завантажити фото</p>
      </button>
      <div className={styles.containerImages}>{allPhotos}</div>
    </div>
  );
};

export default PhotoPlaceholderComponent;
