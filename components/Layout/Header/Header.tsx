import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import logo123 from "@/public/logo/logo123.svg";
import UserNoPhoto from "@/public/user/UserNoPhoto.jpg";
import { AiOutlineMenu } from "react-icons/ai";
import { IoClose } from "react-icons/io5";
import { BsSearch } from "react-icons/bs";
import { isLoggedIn, getUser } from "@/redux/auth/authSelectors";
import styles from "@/styles/Layout/Header/Header.module.css";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import NavBar from "./Mobile/NavBar";
import { Kodchasan } from "next/font/google";
const kodchasan = Kodchasan({ weight: ["700", "500"], subsets: ["latin"] });
import { Comfortaa } from "next/font/google";

import SearchCityMobile from "./Mobile/ChooseLocationMobile";
const comfortaa = Comfortaa({ weight: ["400"], subsets: ["latin"] });

const Header = () => {
  const router = useRouter();
  const login = useSelector(isLoggedIn);
  const user = useSelector(getUser);
  const [menuOpen, setMenuOpen] = useState(false);
  const [req, setReq] = useState("");
  const [isCatContainerVisible, setIsCatContainerVisible] = useState(false);
  const toggleSearchContainer = () => {
    setIsCatContainerVisible(!isCatContainerVisible);
  };
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
    if (!menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  };
  const handleInputChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setReq(event.target.value);
  };
  const handleSearch = () => {
    if (router.pathname === "/artists") {
      // Мы уже находимся на странице /artists
      router.push({
        pathname: "/artists",
        query: {
          ...router.query,
          req,
        },
      });
    } else {
      // Мы на другой странице
      router.push(`/artists?req=${req}`);
    }
  };
  const handleResetSearch = () => {
    router.push({
      pathname: "/artists",
    });
    setReq("");
  };
  useEffect(() => {
    return () => {
      document.body.style.overflow = "auto"; // Reset overflow when component unmounts
    };
  }, []);
  return (
    <div className={comfortaa.className}>
      <div className={styles.mobileContainer}>
        <div className={styles.mobileHeader}>
          <button
            className={styles.burger}
            onClick={toggleMenu}>
            <AiOutlineMenu className={styles.burgerIcon} />
          </button>
          <Link
            href={"/"}
            className={styles.mobileLogoLink}>
            <Image
              src={logo123}
              alt={""}
              priority
              className={styles.logoMob}
            />
            <p className={`${kodchasan.className} ${styles.mobLogoText}`}>
              Wechirka
            </p>
          </Link>
          <button className={styles.search}>
            <BsSearch
              className={styles.searchIcon}
              onClick={toggleSearchContainer}
            />
          </button>
        </div>
        <div
          className={`${styles.visibleContainer} ${
            isCatContainerVisible && styles.move
          }`}>
          <div
            className={`${styles.searchVisible} ${
              isCatContainerVisible && styles.show
            }`}>
            <div className={styles.searchInputContainer}>
              <input
                className={styles.inputSearch}
                type="text"
                placeholder="Пошук"
                value={req}
                onChange={handleInputChange}
              />
              {req && (
                <button
                  className={styles.clearSearch}
                  onClick={handleResetSearch}>
                  <IoClose className={styles.clearSearchIcon} />
                </button>
              )}

              <button
                className={styles.buttonSearch}
                onClick={handleSearch}>
                Знайти
              </button>
              <SearchCityMobile />
            </div>
          </div>
        </div>
      </div>

      <div className={styles.header}>
        <Link
          href={"/"}
          className={styles.logoLink}>
          <Image
            src={logo123}
            alt={""}
            priority
            className={styles.logo}
          />
          <p className={`${kodchasan.className} ${styles.mobLogoText} `}>
            Wechirka
          </p>
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
            <Link
              onClick={toggleMenu}
              href={"/blog"}
              className={`${styles.link} ${
                router.pathname === "/blog" ? styles.active : ""
              }`}>
              Блог
            </Link>
            <div className={styles.separator}></div>
            {login ? (
              <div className={styles.mobileLinkContainer}>
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
                <Link
                  onClick={toggleMenu}
                  href={"/profile/update"}
                  className={`${styles.linkBurgerUser} ${
                    router.pathname === "/profile/update" ? styles.active : ""
                  }`}>
                  Налаштування
                </Link>
                <Link
                  onClick={toggleMenu}
                  href={"/profile/stats"}
                  className={`${styles.linkBurgerUser} ${
                    router.pathname === "/profile/stats" ? styles.active : ""
                  }`}>
                  Статистика
                </Link>
              </div>
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
    </div>
  );
};

export default Header;
