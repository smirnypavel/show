import Link from "next/link";
import React from "react";
import styles from "@/styles/components/Profile/UpdateProfile/Mobile/UpdateProfileTabBar.module.css";
import { IoIosArrowBack } from "react-icons/io";
import { BsFillMenuButtonWideFill } from "react-icons/bs";

interface UpdateProfileTabBarProps {
  onButtonClick: () => void;
}

const UpdateProfileTabBar: React.FC<UpdateProfileTabBarProps> = ({
  onButtonClick,
}) => {
  const handleClick = () => {
    if (onButtonClick) {
      onButtonClick();
    }
  };

  return (
    <div className={styles.container}>
      {" "}
      <button
        onClick={handleClick}
        className={styles.linkButton}
        type="button">
        <BsFillMenuButtonWideFill className={styles.linkIcon} />
      </button>
      <Link
        href={"/profile"}
        className={styles.linkButton}>
        <IoIosArrowBack className={styles.linkIcon} />
        до профілю
      </Link>
    </div>
  );
};

export default UpdateProfileTabBar;
