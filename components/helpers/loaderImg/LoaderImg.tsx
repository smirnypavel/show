import React from "react";
import styles from "./LoaderImg.module.css";

const LoaderImg = () => {
  return (
    <div>
      <div className={styles.loadRow}>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  );
};

export default LoaderImg;
