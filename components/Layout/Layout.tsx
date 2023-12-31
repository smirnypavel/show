import React from "react";
import Footer from "./Footer/Footer";
import Header from "./Header/Header";
import styles from "@/styles/Layout/Layout.module.css"; // импортируем файл со стилями

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className={styles.wrapper}>
      <Header />
      <div className={styles.content}>{children}</div>
      <Footer />
    </div>
  );
};

export default Layout;
