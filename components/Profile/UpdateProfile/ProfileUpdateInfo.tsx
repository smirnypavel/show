import React from "react";
import ProfileUpdateAvatar from "./ProfileUpdateAvatar";
import styles from "@/styles/components/Profile/UpdateProfile/ProfileUpdateInfo.module.css";
import UserUpdateForm from "./UserUpdateForm";
import UserCat from "./UserCat";
import UserUpdateDescription from "./UserUpdateDescription";

const ProfileUpdateInfo = () => {
  return (
    <div className={styles.container}>
      <div className={styles.profileInfoContainer}>
        <UserUpdateForm />
      </div>
      <UserUpdateDescription />
    </div>
  );
};

export default ProfileUpdateInfo;
