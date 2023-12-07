import React from "react";
import TopList from "../../TopList/TopList";
import styles from "@/styles/Home/HomeLeftBest/TopContainer.module.css";
import Image from "next/image";
import bannerBest from "@/public/baners/bannerBest.png";
import TopArtists from "./TopArtists";

const TopContainer = () => {
  return (
    <div className={styles.container}>
      <div className={styles.bannerContainer}>
        <Image
          src={bannerBest}
          alt={""}
          fill
          priority
          sizes="(min-width: 808px) 50vw, 100vw"
        />
      </div>
      <div className={styles.bannerTitleContainer}>
        <p className={styles.bannerTitle}>
          Влаштуйте незабутнє свято для своєї дитини
        </p>
      </div>
      <div className={styles.bannerCategory}>
        <p className={styles.bannerCategoryText}>Найкращі з категорії</p>
      </div>
      <div className={styles.topArtists}>
        <TopArtists />
      </div>
    </div>
  );
};

export default TopContainer;
