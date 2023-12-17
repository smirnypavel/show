import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Component1 from "@/components/Profile/UpdateProfile/ProfileUpdateInfo"; // Подключи компоненты, которые тебе нужны
import Component3 from "@/components/Profile/UpdateProfile/UploadMedia/UpdateMedia";
import Component4 from "@/components/Profile/UpdateProfile/payment";
import styles from "@/styles/components/Profile/UpdateProfile/UpdateProfile.module.css";

const UpdateProfile: React.FC = () => {
  const [activeComponent, setActiveComponent] = useState("Component1"); // Устанавливаем начальный активный компонент

  return (
    <div className={styles.mainContainer}>
      <Sidebar
        setActiveComponent={setActiveComponent}
        activeComponent={activeComponent}
      />
      <div className={styles.content}>
        {activeComponent === "Component1" && <Component1 />}
        {activeComponent === "Component3" && <Component3 />}
        {activeComponent === "Component4" && <Component4 />}
        {/* Добавь другие компоненты с помощью условий, если нужно */}
      </div>
    </div>
  );
};

export default UpdateProfile;
