import React from "react";
import Link from "next/link";
import Image from "next/image";
import Wechirka from "@/public/logo/Wechirka.png";
import { isLoggedIn, getUser } from "@/redux/auth/authSelectors";
import styles from "@/styles/Layout/Header/Header.module.css";
import { useSelector } from "react-redux";
import MyGeolocation from "./Geolocation";
import AutocompleteComponent from "./ChooseLocation";

const Header = () => {
  const login = useSelector(isLoggedIn);
  const user = useSelector(getUser);
  return (
    <div className={styles.header}>
      <Image
        src={Wechirka}
        alt={"Logo"}
        width={150}
      />
      <div className={styles.headerNav}>
        <Link
          href={"/"}
          className={styles.link}>
          Головна
        </Link>
        <Link
          href={"/artists"}
          className={styles.link}>
          Артисти
        </Link>

        <Link
          href={"/about"}
          className={styles.link}>
          Про нас
        </Link>
        <Link
          href={"/blog"}
          className={styles.link}>
          Блог
        </Link>
        {/* <MyGeolocation />
        <AutocompleteComponent /> */}
        {login ? (
          <Link
            href={"/profile"}
            className={styles.link}>
            <Image
              src={user.master_photo}
              alt={"user photo"}
              width={20}
              height={20}
            />
            {user.firstName}
          </Link>
        ) : (
          <Link
            href={"/auth/login"}
            className={styles.link}>
            Auth
          </Link>
        )}
      </div>
    </div>
  );
};

export default Header;
