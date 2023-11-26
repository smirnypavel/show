import { getUser } from "@/redux/auth/authSelectors";
import Image from "next/image";
import React from "react";
import { useSelector } from "react-redux";
import styles from "@/styles/components/Profile/UpdateProfile/ProfileUpdateAvatar.module.css";
import UserNoPhoto from "@/public/user/UserNoPhoto.jpg";

const ProfileUpdateAvatar = () => {
  const user = useSelector(getUser);
  const avatarUrl = user.avatar.url || ""; // Проверяем наличие URL аватара пользователя

  return (
    <div>
      <div className={styles.avatarContainer}>
        <div className={styles.avatarWrapper}>
          {avatarUrl ? (
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
          <button className={styles.updateLink}>Змінити фото</button>
        </div>
      </div>
    </div>
  );
};

export default ProfileUpdateAvatar;
