import React from "react";
import styles from "@/styles/Profile/Profile.module.css";
import UserProfile from "@/components/Profile/UserProfile";
import PrivateRoute from "@/redux/PrivateRoute";

const Profile = () => {
  return (
    <PrivateRoute>
      <div className={styles.container}>
        <UserProfile />
      </div>
    </PrivateRoute>
  );
};

export default Profile;
