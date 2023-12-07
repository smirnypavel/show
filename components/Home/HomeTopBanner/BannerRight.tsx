import React from "react";
import styles from "@/styles/Home/HomeTopBanner/BannerRight.module.css";
import Image from "next/image";
import AdBanner from "@/public/baners/AdBanner.jpg";

const BannerRight = () => {
  return (
    <div className={styles.bannerContainer}>
      <Image
        src={AdBanner}
        alt={"banner"}
        fill
        priority
        sizes="(min-width: 808px) 50vw, 100vw"
        className={styles.banner}
      />
    </div>
  );
};

export default BannerRight;
