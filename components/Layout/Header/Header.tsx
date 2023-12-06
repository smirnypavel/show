import React from "react";
import Link from "next/link";
import Image from "next/image";
import logo123 from "@/public/logo/logo123.svg";
import { isLoggedIn, getUser } from "@/redux/auth/authSelectors";
import styles from "@/styles/Layout/Header/Header.module.css";
import { useSelector } from "react-redux";

const Header = () => {
  const login = useSelector(isLoggedIn);
  const user = useSelector(getUser);
  return (
    <div className={styles.header}>
      <Link href={"/"}>
        {" "}
        {/* <h1 className={styles.logo}>
          Wechirka. <span className={styles.logoSpan}>com</span>
        </h1> */}
        <Image
          src={logo123}
          alt={""}
          className={styles.logo}
        />
      </Link>

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
            className={styles.avatarLink}>
            <div className={styles.avatarWrapper}>
              <Image
                src={user.avatar.url}
                alt={"user photo"}
                fill
                sizes="(min-width: 808px) 50vw, 100vw"
                className={styles.avatar}
              />
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
