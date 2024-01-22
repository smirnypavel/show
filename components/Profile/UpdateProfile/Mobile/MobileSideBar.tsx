import React from "react";
import styles from "@/styles/components/Profile/UpdateProfile/Mobile/MobileSideBar.module.css";
import { useAppDispatch } from "@/redux/hooks";
import { logOut } from "@/redux/auth/authOperations";
import { useRouter } from "next/router";

interface SidebarProps {
  setActiveComponent: (componentName: string) => void;
  activeComponent: string;
  onButtonClick: () => void;
}

const MobileSideBar: React.FC<SidebarProps> = ({
  setActiveComponent,
  activeComponent,
  onButtonClick,
}) => {
  const dispatch = useAppDispatch();
  const handleComponentChange = (componentName: string) => {
    setActiveComponent(componentName);
    onButtonClick();
  };
  const router = useRouter();
  const handleLogout = () => {
    router.push("/").then(() => {
      dispatch(logOut());
    });
  };
  return (
    <div className={styles.sidebar}>
      <button
        className={`${styles.sidebarButton} ${
          activeComponent === "Component1" ? styles.active : ""
        }`}
        onClick={() => handleComponentChange("Component1")}>
        Профіль
      </button>
      <button
        className={`${styles.sidebarButton} ${
          activeComponent === "Component2" ? styles.active : ""
        }`}
        onClick={() => handleComponentChange("Component2")}>
        Контактні данні
      </button>
      <button
        className={`${styles.sidebarButton} ${
          activeComponent === "Component3" ? styles.active : ""
        }`}
        onClick={() => handleComponentChange("Component3")}>
        Соціальні сторінки
      </button>
      <button
        className={`${styles.sidebarButton} ${
          activeComponent === "Component4" ? styles.active : ""
        }`}
        onClick={() => handleComponentChange("Component4")}>
        Фото та відео
      </button>
      <button
        className={`${styles.sidebarButton} ${
          activeComponent === "Component5" ? styles.active : ""
        }`}
        onClick={() => handleComponentChange("Component5")}>
        Підписка
      </button>
      {/* Добавь кнопки для других компонентов, если нужно */}
      <div className={styles.exitingButtonContainer}>
        <button
          className={`${styles.sidebarButton} ${
            activeComponent === "Component5" ? styles.active : ""
          }`}
          onClick={() => handleComponentChange("Component6")}>
          Змінити пароль
        </button>
        <button
          className={styles.sidebarButton}
          onClick={handleLogout}>
          Вийти
        </button>
        <button className={styles.sidebarButton}>Видалити профіль</button>
      </div>
    </div>
  );
};

export default MobileSideBar;
