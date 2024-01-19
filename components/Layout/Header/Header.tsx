import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import logo123 from "@/public/logo/logo123.svg";
import UserNoPhoto from "@/public/user/UserNoPhoto.jpg";
import { IoMenu } from "react-icons/io5";
import { AiOutlineMenu } from "react-icons/ai";
import { IoClose } from "react-icons/io5";

import { BsSearch } from "react-icons/bs";

import { isLoggedIn, getUser } from "@/redux/auth/authSelectors";
import styles from "@/styles/Layout/Header/Header.module.css";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import NavBar from "./Mobile/NavBar";

const Header = () => {
  const router = useRouter();
  const login = useSelector(isLoggedIn);
  const user = useSelector(getUser);
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
  return (
    <>
      <div className={styles.mobileHeader}>
        <button
          className={styles.burger}
          onClick={toggleMenu}>
          <AiOutlineMenu className={styles.burgerIcon} />
        </button>
        <Link
          href={"/"}
          className={styles.mobileLogo}>
          Wechirka
          {/* <Image
            src={logo123}
            alt={""}
            priority
            className={styles.logo}
            
          /> */}
        </Link>
        <button className={styles.search}>
          <BsSearch className={styles.cearchIcon} />
        </button>
      </div>
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
          {/* <Link
            href={"/blog"}
            className={`${styles.link} ${
              router.pathname === "/blog" ? styles.active : ""
            }`}>
            Блог
          </Link> */}
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
      {menuOpen && (
        <div className={styles.mobileMenu}>
          <button
            className={styles.close}
            onClick={toggleMenu}>
            <IoClose className={styles.burgerIcon} />
          </button>
          <div className={styles.mobileNav}>
            <Link
              onClick={toggleMenu}
              href={"/"}
              className={`${styles.link} ${
                router.pathname === "/" ? styles.active : ""
              }`}>
              Головна
            </Link>
            <Link
              onClick={toggleMenu}
              href={"/artists"}
              className={`${styles.link} ${
                router.pathname === "/artists" ? styles.active : ""
              }`}>
              Артисти
            </Link>
            <Link
              onClick={toggleMenu}
              href={"/about"}
              className={`${styles.link} ${
                router.pathname === "/about" ? styles.active : ""
              }`}>
              Про нас
            </Link>
            {/* <Link
              onClick={toggleMenu}
              href={"/blog"}
              className={`${styles.link} ${
                router.pathname === "/blog" ? styles.active : ""
              }`}>
              Блог
            </Link> */}
            {login ? (
              <Link
                onClick={toggleMenu}
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
      )}
      <NavBar />
    </>
  );
};

export default Header;
