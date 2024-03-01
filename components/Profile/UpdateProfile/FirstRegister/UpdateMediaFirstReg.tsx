import React from "react";
import PhotoPlaceholderComponent from "../UploadMedia/TestPhoto";
import styles from "@/styles/components/Profile/UpdateProfile/FirstRegister/UpdateMediaFirstReg.module.css";
import UploadVideo from "../UploadMedia/UploadVideo";

const UpdateMediaFirstReg = () => {
  return (
    <div className={styles.container}>
      <PhotoPlaceholderComponent />
      <UploadVideo />
    </div>
  );
};

export default UpdateMediaFirstReg;
