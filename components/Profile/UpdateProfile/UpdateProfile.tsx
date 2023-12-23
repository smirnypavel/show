import React, { useState } from "react";
import { useRouter } from "next/router";
import Sidebar from "./Sidebar";
import Component1 from "@/components/Profile/UpdateProfile/ProfileUpdateInfo"; // Подключи компоненты, которые тебе нужны
import Component3 from "@/components/Profile/UpdateProfile/UploadMedia/UpdateMedia";
import Component4 from "@/components/Profile/UpdateProfile/payment";
import Component5 from "@/components/Profile/UpdateProfile/ChangePassword";
import styles from "@/styles/components/Profile/UpdateProfile/UpdateProfile.module.css";
import { IoIosArrowForward } from "react-icons/io";

const UpdateProfile: React.FC = () => {
  const [activeComponent, setActiveComponent] = useState("Component1"); // Устанавливаем начальный активный компонент
  const router = useRouter();
  const handleGoBack = () => {
    router.back(); // Переход назад на предыдущую страницу
  };
  return (
    <>
      <div className={styles.mainContainer}>
        <div className={styles.buttonBackContainer}>
          <button
            onClick={handleGoBack}
            className={styles.buttonBack}>
            <div> Мій профіль</div>
          </button>
          <IoIosArrowForward />
          <div className={styles.buttonBackText}> Налаштування профілю</div>
        </div>
        <Sidebar
          setActiveComponent={setActiveComponent}
          activeComponent={activeComponent}
        />
        <div className={styles.content}>
          {activeComponent === "Component1" && <Component1 />}
          {activeComponent === "Component3" && <Component3 />}
          {activeComponent === "Component4" && <Component4 />}
          {activeComponent === "Component5" && <Component5 />}
          {/* Добавь другие компоненты с помощью условий, если нужно */}
        </div>
      </div>
    </>
  );
};

export default UpdateProfile;
