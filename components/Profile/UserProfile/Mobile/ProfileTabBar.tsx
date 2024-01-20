import Link from "next/link";
import React from "react";
import styles from "@/styles/components/Profile/Profile/Mobile/ProfileTabBar.module.css";
import { IoStatsChartOutline } from "react-icons/io5";
import { TbUserEdit } from "react-icons/tb";
const ProfileTabBar = () => {
  return (
    <div className={styles.container}>
      <Link
        href={"/profile/stats"}
        className={styles.linkButton}>
        Статистика
        <IoStatsChartOutline className={styles.linkIcon} />
      </Link>
      <Link
        href={""}
        className={styles.linkButton}>
        <TbUserEdit className={styles.linkIcon} />
        Редагування
      </Link>
    </div>
  );
};

export default ProfileTabBar;
