import React from "react";
import styles from "@/styles/Profile/Profile.module.css";
import UserProfile from "@/components/Profile/UserProfile";

const Profile = () => {
  return (
    <div className={styles.container}>
      <UserProfile />
    </div>
  );
};

export default Profile;
