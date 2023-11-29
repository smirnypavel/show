import React from "react";

//
import styles from "../../styles/Profile/ProfileUpdate.module.css";
import UpdateProfile from "@/components/Profile/UpdateProfile/UpdateProfile";

const Update: React.FC = () => {
  return (
    <div className={styles.container}>
      <UpdateProfile />
    </div>
  );
};

export default Update;
