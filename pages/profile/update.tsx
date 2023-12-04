import React from "react";
import styles from "../../styles/Profile/ProfileUpdate.module.css";
import UpdateProfile from "@/components/Profile/UpdateProfile/UpdateProfile";
import PrivateRoute from "@/redux/PrivateRoute";

const Update: React.FC = () => {
  return (
    <PrivateRoute>
      <div className={styles.container}>
        <UpdateProfile />
      </div>
    </PrivateRoute>
  );
};

export default Update;
