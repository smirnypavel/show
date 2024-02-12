import React, { useState } from "react";
import {
  PiUserLight,
  PiUserGearThin,
  PiUserListThin,
  PiSkullThin,
  PiSignOutThin,
  PiKeyholeThin,
  PiKeyThin,
} from "react-icons/pi";
import styles from "@/styles/Layout/LayoutProfile.module.css"; // импортируем файл со стилями
import Link from "next/link";
import { useRouter } from "next/router";
import Modal from "../helpers/Modal";
import ChangePassword from "../Profile/UpdateProfile/ChangePassword";

const LayoutProfile: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.nav}>
        <div className={styles.navLinksContainer}>
          <Link
            className={`${styles.navLink} ${
              router.pathname === "/profile" ? styles.active : ""
            }`}
            href={"/profile"}>
            <PiUserLight className={styles.icon} /> Профіль
          </Link>
          <Link
            className={`${styles.navLink} ${
              router.pathname === "/profile/update" ? styles.active : ""
            }`}
            href={"/profile/update"}>
            <PiUserGearThin className={styles.icon} /> Налаштування
          </Link>

          <Link
            className={`${styles.navLink} ${
              router.pathname === "/profile/stats" ? styles.active : ""
            }`}
            href={"/profile/stats"}>
            <PiUserListThin className={styles.icon} /> Статистика
          </Link>
        </div>
        <div className={styles.service}>
          <div className={styles.serviceLink}>
            {" "}
            <PiSignOutThin className={styles.serviceIcon} />
            Вийти
          </div>
          <div
            className={styles.serviceLink}
            onClick={openModal}>
            <PiKeyThin className={styles.serviceIcon} />
            Змінити пароль
          </div>
          <div className={styles.serviceLink}>
            {" "}
            <PiSkullThin className={styles.serviceIcon} />
            Видалити профіль
          </div>
        </div>
      </div>
      <div className={styles.content}>{children}</div>
      {isModalOpen && (
        <Modal onClose={closeModal}>
          <ChangePassword />
        </Modal>
      )}
    </div>
  );
};

export default LayoutProfile;
