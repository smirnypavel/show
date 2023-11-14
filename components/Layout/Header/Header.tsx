import React from "react";
import Link from "next/link";
import Image from "next/image";

import { isLoggedIn, getUser } from "@/redux/auth/authSelectors";
import styles from "@/styles/Layout/Header/Header.module.css";
import { useSelector } from "react-redux";
import MyGeolocation from "./Geolocation";

const Header = () => {
  const login = useSelector(isLoggedIn);
  const user = useSelector(getUser);
  return (
    <div className={styles.header}>
      <div className={styles.headerNav}>
        <Link href={"/"}>Home</Link>
        <Link href={"/artists"}>Artists</Link>
        <Link href={"/auth/login"}>Auth</Link>
        <Link href={"/about"}>About</Link>
        <MyGeolocation />
      </div>
      {login && (
        <Link href={"/profile"}>
          <Image
            src={user.master_photo}
            alt={"user photo"}
            width={20}
            height={20}
          />
          {user.firstName}
        </Link>
      )}
    </div>
  );
};

export default Header;
