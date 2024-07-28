import React from "react";
import { StepProps } from "@/types/IRegFormData";
import styles2 from "@/styles/components/Profile/UpdateProfile/FirstRegister/UpdateDescriptionFirstReg.module.css";
import stylesInput from "@/styles/components/Profile/UpdateProfile/FirstRegister/FirstRegNew/Step1.module.css";
import styles from "@/styles/components/Profile/UpdateProfile/FirstRegister/GroupForm.module.css";

const Step2: React.FC<StepProps> = ({ data, setData }) => {
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  return (
    <div className={styles.container}>
      <p className={styles.title}>
        Тепер запишемо інформацію щодо Вашого виду діяльності
      </p>
      <p className={styles.titleInput}>Назва гурту чи Вашої діяльності:</p>
      <input
        type="text"
        name="title"
        value={data.title || ""}
        onChange={handleChange}
        className={stylesInput.input}
        placeholder={
          "Тут має бути назва Вашого гурту або назва Вашого колективу "
        }
      />
      <p className={styles.titleInput}>Ціна:</p>

      <input
        type="text"
        name="price"
        value={data.price || ""}
        onChange={handleChange}
        className={stylesInput.input}
      />
      <p className={styles.titleInput}>
        Опис того чим Ви займаєтесь та що пропонуєте:
      </p>
      <textarea
        name="description"
        value={data.description || ""}
        onChange={handleChange}
        className={styles2.input}
      />
    </div>
  );
};

export default Step2;
