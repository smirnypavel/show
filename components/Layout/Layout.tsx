import React from "react";
import Footer from "./Footer/Footer";
import Header from "./Header/Header";
import styles from "@/styles/Layout/Layout.module.css"; // импортируем файл со стилями

import Geolocation from "./Header/GealocationNew";
import FeedbackButton from "../helpers/Feedback";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className={styles.wrapper}>
      {/* <ul className={styles.floatingBoxes}>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
      </ul> */}
      <Geolocation />
      <Header />
      <div className={styles.content}>{children}</div>
      <Footer />
      <FeedbackButton />
    </div>
  );
};

export default Layout;
