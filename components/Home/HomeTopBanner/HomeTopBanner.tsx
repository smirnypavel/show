import React from "react";
import styles from "@/styles/Home/HomeTopBanner/HomeTopBanner.module.css";
import BannerLeft from "./BannerLeft";
import BannerRight from "./BannerRight";
const HomeTopBanner = () => {
  return (
    <div className={styles.chatContainer}>
      <BannerLeft />
      <BannerRight />
    </div>
  );
};

export default HomeTopBanner;
