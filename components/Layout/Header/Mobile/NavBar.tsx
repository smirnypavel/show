import React from "react";
import styles from "@/styles/Layout/Header/Mobile/NavBar.module.css";
import Link from "next/link";
import Image from "next/image";
import UserNoPhoto from "@/public/user/UserNoPhoto.jpg";
import { useRouter } from "next/router";
import { TbHome } from "react-icons/tb";
import { LuUsers } from "react-icons/lu";
import { LuUser } from "react-icons/lu";
import { LuPlus } from "react-icons/lu";
import { useAppSelector } from "@/redux/hooks";
import { getUser, isLoggedIn } from "@/redux/auth/authSelectors";

const NavBar = () => {
  const router = useRouter();
  const login = useAppSelector(isLoggedIn);
  const user = useAppSelector(getUser);
  return (
    <div>
      {" "}
      <div className={styles.navBar}>
        <Link
          href={"/"}
          className={`${styles.navBarLink} ${
            router.pathname === "/" ? styles.navBarActive : ""
          }`}>
          <TbHome className={styles.navBarIcon} />
          Головна
        </Link>
        <Link
          href={"/artists"}
          className={`${styles.navBarLink} ${
            router.pathname === "/artists" ? styles.navBarActive : ""
          }`}>
          <LuUsers className={styles.navBarIcon} />
          Артисти
        </Link>
        <Link
          href={"/artists"}
          className={`${styles.navBarLink} ${
            router.pathname === "/artists" ? styles.navBarActive : ""
          }`}>
          <LuPlus className={styles.navBarIcon} />
          Залишити
          <br /> запит
        </Link>
        {login ? (
          <Link
            href={"/profile"}
            className={styles.navBarLink}>
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
            Профіль
          </Link>
        ) : (
          <Link
            href={"/auth/login"}
            className={styles.navBarLink}>
            <LuUser className={styles.navBarIcon} />
            Профіль
          </Link>
        )}
      </div>
    </div>
  );
};

export default NavBar;
