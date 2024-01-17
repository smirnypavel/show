import React from "react";
import styles from "@/styles/components/Artist/Mobile/MobileSort.module.css";
import { LuArrowDownUp } from "react-icons/lu";

const MobileSort = () => {
  return (
    <div>
      <button className={styles.buttonSort}>
        Сортувати <LuArrowDownUp className={styles.sortIcon} />
      </button>
    </div>
  );
};

export default MobileSort;
