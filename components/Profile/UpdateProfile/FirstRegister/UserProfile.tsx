import React from "react";
import ProfileUpdateAvatar from "../ProfileUpdateAvatar";
import UserInfo from "./UserInfo";
import styles from "@/styles/components/Profile/UpdateProfile/FirstRegister/UserProfileRegister.module.css";

const UserProfile = () => {
  return (
    <div className={styles.container}>
      <p>Для початку додайте свої данні</p>
      <ProfileUpdateAvatar />
      <UserInfo />
    </div>
  );
};

export default UserProfile;
