import React, { useRef, ChangeEvent } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  deletePhoto,
  updateUser,
  uploadImage, // изменили импорт
} from "@/redux/auth/authOperations";
import { getUser, getUserPhoto, isLoading } from "@/redux/auth/authSelectors";
import Image from "next/image";
import NoPhoto_PNG from "@/public/user/NoPhoto_PNG.png";
import { IoClose } from "react-icons/io5";
import { HiOutlineDownload, HiOutlineStar } from "react-icons/hi";
import { IPhoto } from "@/types/IAuth";
import { RiLoader2Line } from "react-icons/ri";
import styles from "@/styles/components/Profile/UpdateProfile/UpdateMedia/TestPhoto.module.css";

const processFiles = (
  files: FileList | null,
  existingCount: number,
  maxCount: number,
  dispatch: any
) => {
  if (files) {
    const filesArray = Array.from(files);
    const validFiles = filesArray.slice(0, maxCount - existingCount);
    dispatch(uploadImage(validFiles)); // изменили на uploadImages
  }
};

const PhotoPlaceholderComponent: React.FC = () => {
  const userPhoto = useAppSelector(getUserPhoto);
  const user = useAppSelector(getUser);
  const loading = useAppSelector(isLoading);
  const dispatch = useAppDispatch();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const existingImages = userPhoto.map((photo) => photo.url);
  const emptyImageCount = 6 - existingImages.length;

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    processFiles(event.target.files, existingImages.length, 6, dispatch);
  };

  const handleDeletePhoto = (publicId: string) => {
    dispatch(deletePhoto({ id: publicId }));
  };

  const handleAddMasterPhoto = (photo: IPhoto) => {
    dispatch(updateUser({ master_photo: photo }));
  };

  const renderPhotoPlaceholders = () =>
    Array.from({ length: emptyImageCount }, (_, index) => (
      <div
        key={`placeholder-${index}`}
        className={styles.imageContainer}>
        <Image
          src={NoPhoto_PNG}
          alt="Empty Placeholder"
          className={styles.image}
          fill
          sizes="(min-width: 808px) 50vw, 100vw"
        />
      </div>
    ));

  const renderPhotos = () =>
    userPhoto.map((photo) => (
      <div
        key={photo.publicId}
        className={styles.imageContainer}>
        <Image
          src={photo.url}
          alt=""
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

  return (
    <div className={styles.container}>
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        ref={fileInputRef}
        disabled={emptyImageCount <= 0}
        style={{ display: "none" }}
        multiple
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
      <div className={styles.containerImages}>
        {renderPhotos()}
        {renderPhotoPlaceholders()}
      </div>
    </div>
  );
};

export default PhotoPlaceholderComponent;
