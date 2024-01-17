import React, { useState } from "react";
import styles from "@/styles/components/Artist/Mobile/MobileCat.module.css";
import { IoIosArrowBack } from "react-icons/io";

const MobileCat = () => {
  const [isCatContainerVisible, setIsCatContainerVisible] = useState(false);

  const toggleCatContainer = () => {
    setIsCatContainerVisible(!isCatContainerVisible);
  };

  return (
    <div>
      <button
        className={`${styles.buttonCat} ${
          isCatContainerVisible && styles.show
        }`}
        onClick={toggleCatContainer}>
        Обрати категорію
      </button>
      <div
        className={`${styles.catContainer} ${
          isCatContainerVisible && styles.show
        }`}>
        <div className={styles.catContainerNav}>
          <button className={styles.buttonNav}>
            <IoIosArrowBack className={styles.buttonNavIcon} />
          </button>
          <button className={styles.buttonNav}>Скасувати</button>
        </div>
      </div>
    </div>
  );
};

export default MobileCat;
