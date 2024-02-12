import React from "react";
import { PiUserLight, PiUserGearThin, PiUserListThin } from "react-icons/pi";
import styles from "@/styles/Layout/LayoutProfile.module.css"; // импортируем файл со стилями
import Link from "next/link";

const LayoutProfile: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.nav}>
        <Link
          className={styles.navLink}
          href={"/profile"}>
          <PiUserLight className={styles.icon} /> Профіль
        </Link>
        <Link
          className={styles.navLink}
          href={"profile/update"}>
          {" "}
          <PiUserGearThin className={styles.icon} /> Налаштування
        </Link>
        <Link
          className={styles.navLink}
          href={"/profile/stats"}>
          {" "}
          <PiUserListThin className={styles.icon} /> Статистика
        </Link>
      </div>
      <div className={styles.content}>{children}</div>
    </div>
  );
};

export default LayoutProfile;
