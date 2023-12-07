import React from "react";
import PhotoPlaceholderComponent from "./TestPhoto";
import styles from "@/styles/components/Profile/UpdateProfile/UpdateMedia/UpdateMedia.module.css";
import UploadVideo from "./UploadVideo";

const UpdateMedia = () => {
  return (
    <div className={styles.container}>
      {/* <ImageUploadComponent /> */}
      {/* <CloudinaryImageUpload /> */}
      <PhotoPlaceholderComponent />
      <UploadVideo />
    </div>
  );
};

export default UpdateMedia;
