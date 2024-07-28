import React from "react";
import { StepProps } from "@/types/IRegFormData";
import ProfileUpdateAvatar from "../../ProfileUpdateAvatar";
import styles from "@/styles/components/Profile/UpdateProfile/FirstRegister/UserProfileRegister.module.css";
import stylesInput from "@/styles/components/Profile/UpdateProfile/FirstRegister/FirstRegNew/Step1.module.css";
import SearchCityRegister from "../SearchCityRegister";

const Step1: React.FC<StepProps> = ({ data, setData }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, firstName: e.target.value });
  };

  return (
    <div className={styles.container}>
      <p>Для початку додайте свої данні</p>
      <ProfileUpdateAvatar />
      <p className={styles.titleInput}>Ваше Ім’я:</p>

      <input
        type="text"
        value={data.firstName || ""}
        onChange={handleChange}
        placeholder={"Тут має бути Ваше Ім’я"}
        className={stylesInput.input}
      />
      <p className={styles.titleInput}>
        Місто чи область в якій Bи будете працювати:
      </p>
      <SearchCityRegister />
    </div>
  );
};

export default Step1;
