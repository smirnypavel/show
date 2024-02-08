import React from "react";
import Footer from "./Footer/Footer";
import Header from "./Header/Header";
import styles from "@/styles/Layout/Layout.module.css"; // импортируем файл со стилями
import UserLocation from "./Header/Geolocation";
import { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://my-independence-war.vercel.app/"),
  title: {
    template: "%s | My Independence War",
    default: "My Independence War",
  },
  description:
    "Technological demo project that talks about my Ukraine war stories",
};

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className={styles.wrapper}>
      <UserLocation />
      <Header />
      <div className={styles.content}>{children}</div>
      <Footer />
    </div>
  );
};

export default Layout;
