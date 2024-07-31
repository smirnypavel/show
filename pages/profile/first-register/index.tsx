import React from "react";
import styles from "@/styles/FirstRegisterPage/FirstRegisterPage.module.css";
import MultiStepForm from "@/components/Profile/UpdateProfile/FirstRegister/RegistrNew/MultiStepForm";
import MultiPageComponent from "@/components/Profile/UpdateProfile/FirstRegister/FirstRegister";

const FirstRegisterPage = () => {
  return (
    <div className={styles.container}>
      <MultiPageComponent />
    </div>
  );
};

export default FirstRegisterPage;
