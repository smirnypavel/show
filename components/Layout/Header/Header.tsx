import React from "react";
import Link from "next/link";
import Image from "next/image";
import logo123 from "@/public/logo/logo123.svg";
import UserNoPhoto from "@/public/user/UserNoPhoto.jpg";

import { isLoggedIn, getUser } from "@/redux/auth/authSelectors";
import styles from "@/styles/Layout/Header/Header.module.css";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";

const Header = () => {
  const router = useRouter();
  const login = useSelector(isLoggedIn);
  const user = useSelector(getUser);
  return (
    <div className={styles.header}>
      <Link href={"/"}>
        <Image
          src={logo123}
          alt={""}
          priority
          className={styles.logo}
        />
      </Link>

      <div className={styles.headerNav}>
        <Link
          href={"/"}
          className={`${styles.link} ${
            router.pathname === "/" ? styles.active : ""
          }`}>
          Головна
        </Link>
        <Link
          href={"/artists"}
          className={`${styles.link} ${
            router.pathname === "/artists" ? styles.active : ""
          }`}>
          Артисти
        </Link>

        <Link
          href={"/about"}
          className={`${styles.link} ${
            router.pathname === "/about" ? styles.active : ""
          }`}>
          Про нас
        </Link>
        <Link
          href={"/blog"}
          className={`${styles.link} ${
            router.pathname === "/blog" ? styles.active : ""
          }`}>
          Блог
        </Link>
        {/* <MyGeolocation />
        <AutocompleteComponent /> */}
        {login ? (
          <Link
            href={"/profile"}
            className={styles.avatarLink}>
            <div className={styles.avatarWrapper}>
              {user.avatar.url ? (
                <Image
                  src={user.avatar.url}
                  alt={"user photo"}
                  fill
                  sizes="(min-width: 808px) 50vw, 100vw"
                  className={styles.avatar}
                />
              ) : (
                <Image
                  src={UserNoPhoto}
                  alt={"user photo"}
                  fill
                  sizes="(min-width: 808px) 50vw, 100vw"
                  className={styles.avatar}
                />
              )}
            </div>
            {user.firstName}
          </Link>
        ) : (
          <Link
            href={"/auth/login"}
            className={styles.link}>
            Я артист
          </Link>
        )}
      </div>
    </div>
  );
};

export default Header;
