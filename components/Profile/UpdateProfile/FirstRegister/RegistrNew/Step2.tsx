import React from "react";
import { StepProps } from "@/types/IRegFormData";
import stylesInput from "@/styles/components/Profile/UpdateProfile/FirstRegister/FirstRegNew/Step1.module.css";
import styles from "@/styles/components/Profile/UpdateProfile/FirstRegister/UpdateContactFirstRegister.module.css";
import { HiOutlinePhone } from "react-icons/hi";
import Image from "next/image";
import TelegramLogo from "@/public/icon/TelegramLogo.svg";
import { SiMaildotru } from "react-icons/si";
import ViberLogo from "@/public/icon/ViberLogo.svg";
import WhatsApp from "@/public/icon/WhatsApp.svg";

const Step2: React.FC<StepProps> = ({ data, setData }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  return (
    <div className={styles.container}>
      <div>
        <p className={styles.contactsTitle}>Ваші контактні данні</p>
        <div className={styles.socialContainer}>
          <div>
            <p className={styles.contactLabel}>
              Телефон <HiOutlinePhone className={styles.contactIcon} />
            </p>
            <input
              type="text"
              name="phone"
              value={data.phone || ""}
              onChange={handleChange}
              className={stylesInput.input}
            />{" "}
            <p className={styles.contactLabel}>
              Телеграм
              <Image
                src={TelegramLogo}
                alt="Telegram Logo"
                className={styles.contactIcon}
              />
            </p>
            <input
              type="text"
              name="telegram"
              value={data.telegram || ""}
              onChange={handleChange}
              className={stylesInput.input}
            />
            <p className={styles.contactLabel}>
              Почта <SiMaildotru className={styles.contactIcon} />
            </p>
            <input
              type="mail"
              name="email"
              value={data.mail || ""}
              onChange={handleChange}
              className={stylesInput.input}
            />
          </div>

          <div>
            <p className={styles.contactLabel}>
              Вайбер{" "}
              <Image
                src={ViberLogo}
                alt="Viber Logo"
                className={styles.contactIcon}
              />
            </p>
            <input
              type="text"
              name="viber"
              value={data.viber || ""}
              onChange={handleChange}
              className={stylesInput.input}
            />
            <p className={styles.contactLabel}>
              Вотсап{" "}
              <Image
                src={WhatsApp}
                alt="WhatsApp Logo"
                className={styles.contactIcon}
              />
            </p>
            <input
              type="text"
              name="whatsapp"
              value={data.whatsapp || ""}
              onChange={handleChange}
              className={stylesInput.input}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Step2;
