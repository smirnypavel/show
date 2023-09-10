import React from "react";
import TopList from "../TopList/TopList";
import styles from "@/styles/Home/TopContainer.module.css";

const TopContainer = () => {
  return (
    <div className={styles.container}>
      <TopList />
      <TopList />
      <TopList />
    </div>
  );
};

export default TopContainer;
