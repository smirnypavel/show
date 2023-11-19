import React from "react";
import styles from "@/styles/Home/HomeTopBanner/BannerRight.module.css";
import Image from "next/image";
import AdBanner from "@/public/baners/AdBanner.jpg";

const BannerRight = () => {
  return (
    <div className={styles.bannerContainer}>
      <Image
        src={AdBanner}
        alt={""}
        fill
        // width={671}
        // height={260}
        className={styles.banner}
      />
    </div>
  );
};

export default BannerRight;
