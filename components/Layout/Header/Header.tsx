import React from "react";
import styles from "@/styles/Layout/Header/Header.module.css";
import Link from "next/link";

const Header = () => {
  return (
    <div className={styles.header}>
      <div className={styles.headerNav}>
        <Link href={"/"}>Home</Link>
        <Link href={"/artists"}>Artists</Link>
        <Link href={"/auth/login"}>Auth</Link>
        <Link href={"/about"}>About</Link>
      </div>
    </div>
  );
};

export default Header;
