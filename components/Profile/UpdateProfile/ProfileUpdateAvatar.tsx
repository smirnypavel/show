import { getUser, isLoading } from "@/redux/auth/authSelectors";
import Image from "next/image";
import React, { useRef } from "react";
import { useSelector } from "react-redux";
import styles from "@/styles/components/Profile/UpdateProfile/ProfileUpdateAvatar.module.css";
import UserNoPhoto from "@/public/user/UserNoPhoto.jpg";
import { useAppDispatch } from "@/redux/hooks";
import { uploadAvatar } from "@/redux/auth/authOperations";
import LoaderImg from "@/components/helpers/loaderImg/LoaderImg";

const ProfileUpdateAvatar = () => {
  const user = useSelector(getUser);
  const loading = useSelector(isLoading);
  const dispatch = useAppDispatch();
  const avatarUrl = user.avatar.url || ""; // Проверяем наличие URL аватара пользователя
  const inputRef = useRef<HTMLInputElement>(null); // Создаем ссылку на элемент input
  const handleAvatarUpload: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    const file = event.target.files?.[0]; // Получение файла из input

    if (file) {
      // Вызов операции для загрузки аватара
      dispatch(uploadAvatar(file));
    }
  };
  const handleButtonClick = () => {
    // Имитируем клик по input, чтобы открыть диалог выбора файла
    if (inputRef.current) {
      inputRef.current.click();
    }
  };
  return (
    <div>
      <div className={styles.avatarContainer}>
        <div className={styles.avatarWrapper}>
          {loading ? ( // Если идет загрузка, показываем лоадер
            <LoaderImg />
          ) : avatarUrl ? (
            <Image
              src={avatarUrl}
              alt="avatar"
              fill
              className={styles.avatar}
              sizes="(min-width: 808px) 50vw, 100vw"
            />
          ) : (
            <Image
              src={UserNoPhoto}
              alt="No Photo"
              fill
              className={styles.avatar}
              sizes="(min-width: 808px) 50vw, 100vw"
            />
          )}
        </div>
        <div className={styles.updateLinkContainer}>
          <button
            className={styles.updateLink}
            onClick={handleButtonClick}>
            Змінити фото
          </button>
          {/* Скрываем инпут и используем его через кнопку */}
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            multiple
            onChange={handleAvatarUpload}
            style={{ display: "none" }}
          />
        </div>
      </div>
    </div>
  );
};

export default ProfileUpdateAvatar;
