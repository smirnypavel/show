import React, { useState } from "react";
import { useRouter } from "next/router";
import Sidebar from "./Sidebar";
import Component1 from "@/components/Profile/UpdateProfile/ProfileUpdateInfo";
import Component2 from "@/components/Profile/UpdateProfile/UpdateContacts"; // Подключи компоненты, которые тебе нужны
import Component3 from "@/components/Profile/UpdateProfile/UpdateSocial";

import Component4 from "@/components/Profile/UpdateProfile/UploadMedia/UpdateMedia";
import Component5 from "@/components/Profile/UpdateProfile/payment";
import Component6 from "@/components/Profile/UpdateProfile/ChangePassword";
import styles from "@/styles/components/Profile/UpdateProfile/UpdateProfile.module.css";
import { IoIosArrowForward } from "react-icons/io";
import UpdateProfileTabBar from "./Mobile/UpdateProfileTabBar";
import MobileSideBar from "./Mobile/MobileSideBar";

const UpdateProfile: React.FC = () => {
  const [showSideBar, setShowSideBar] = useState(false);
  const [activeComponent, setActiveComponent] = useState("Component1"); // Устанавливаем начальный активный компонент
  const router = useRouter();
  const handleGoBack = () => {
    router.back(); // Переход назад на предыдущую страницу
  };
  const handleShowSideBar = () => {
    setShowSideBar(!showSideBar);
  };
  return (
    <>
      <div className={styles.mobileButtonContainer}>
        <UpdateProfileTabBar onButtonClick={handleShowSideBar} />
      </div>
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
        <div
          className={`${styles.socialContainer} ${
            showSideBar ? styles.show : styles.hide
          }`}>
          <MobileSideBar
            onButtonClick={handleShowSideBar}
            setActiveComponent={setActiveComponent}
            activeComponent={activeComponent}
          />
        </div>
        <Sidebar
          setActiveComponent={setActiveComponent}
          activeComponent={activeComponent}
        />
        <div className={styles.content}>
          {activeComponent === "Component1" && <Component1 />}
          {activeComponent === "Component2" && <Component2 />}
          {activeComponent === "Component3" && <Component3 />}
          {activeComponent === "Component4" && <Component4 />}
          {activeComponent === "Component5" && <Component5 />}
          {activeComponent === "Component6" && <Component6 />}
          {/* Добавь другие компоненты с помощью условий, если нужно */}
        </div>
      </div>
    </>
  );
};

export default UpdateProfile;
