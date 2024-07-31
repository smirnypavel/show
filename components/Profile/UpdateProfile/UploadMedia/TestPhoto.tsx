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

const PhotoPlaceholderComponent = () => {
  const userPhoto = useAppSelector(getUserPhoto);
  const user = useAppSelector(getUser);
  const loading = useAppSelector(isLoading);
  const existingImages = userPhoto.map((photo) => photo.url);
  const emptyImageCount = 6 - existingImages.length;
  const dispatch = useAppDispatch();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files; // Получаем все файлы из FileList
    if (files && files.length > 0) {
      const fileArray = Array.from(files); // Преобразуем FileList в массив
      dispatch(uploadImage(fileArray)); // Передаем массив файлов
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
        multiple // Добавляем атрибут multiple для выбора нескольких файлов
      />
      <button
        onClick={handleButtonClick}
        disabled={emptyImageCount <= 0 || loading}
        className={styles.download}>
        {loading ? (
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
