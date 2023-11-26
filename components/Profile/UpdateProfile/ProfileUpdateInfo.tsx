import React from "react";
import ProfileUpdateAvatar from "./ProfileUpdateAvatar";
import styles from "@/styles/components/Profile/UpdateProfile/ProfileUpdateInfo.module.css";
import UserUpdateForm from "./UserUpdateForm";

const ProfileUpdateInfo = () => {
  return (
    <div className={styles.container}>
      <div className={styles.profileInfoContainer}>
        <ProfileUpdateAvatar />
        <UserUpdateForm />
      </div>
    </div>
  );
};

export default ProfileUpdateInfo;
