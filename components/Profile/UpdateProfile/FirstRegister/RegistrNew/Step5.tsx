import React from "react";
import Image from "next/image";

import { StepProps } from "@/types/IRegFormData";
import styles from "@/styles/components/Profile/UpdateProfile/FirstRegister/UpdateContactFirstRegister.module.css";
import stylesInput from "@/styles/components/Profile/UpdateProfile/FirstRegister/FirstRegNew/Step1.module.css";

import { CgWebsite } from "react-icons/cg";
import instagram from "@/public/icon/instagram.svg";
import FacebookLogo from "@/public/icon/FacebookLogo.svg";
import YouTubeLogo from "@/public/icon/YouTubeLogo.svg";
import tiktokApp from "@/public/icon/tiktokApp.svg";
const Step5: React.FC<StepProps> = ({ data, setData }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData({ ...data, social: { ...data.social, [name]: value } });
  };

  return (
    <div className={styles.container}>
      <div>
        <p className={styles.contactsTitle}>
          Ваші соціальні сторінки або Вебсайт
        </p>
        <div className={styles.socialContainer}>
          <div>
            <p className={styles.contactLabel}>
              Facebook{" "}
              <Image
                src={FacebookLogo}
                alt="FacebookLogo"
                className={styles.contactIcon}
              />
            </p>
            <input
              type="text"
              name="Facebook"
              value={data.social?.Facebook || ""}
              onChange={handleChange}
              className={stylesInput.input}
              placeholder="Посилання на Facebook сторинку"
            />
            <p className={styles.contactLabel}>
              Instagram{" "}
              <Image
                src={instagram}
                alt="instagram Logo"
                className={styles.contactIcon}
              />
            </p>
            <input
              type="text"
              name="Instagram"
              value={data.social?.Instagram || ""}
              onChange={handleChange}
              className={stylesInput.input}
              placeholder="Посилання на Instagram сторинку"
            />
            <p className={styles.contactLabel}>
              YouTube{" "}
              <Image
                src={YouTubeLogo}
                alt="YouTubeLogo"
                className={styles.contactIcon}
              />
            </p>
            <input
              type="text"
              name="Youtube"
              value={data.social?.Youtube || ""}
              onChange={handleChange}
              className={stylesInput.input}
              placeholder="Посилання на Youtube сторинку"
            />
          </div>
          <div>
            <p className={styles.contactLabel}>
              Tik-Tok{" "}
              <Image
                src={tiktokApp}
                alt="tiktok Logo"
                className={styles.contactIcon}
              />
            </p>
            <input
              type="text"
              name="TikTok"
              value={data.social?.TikTok || ""}
              onChange={handleChange}
              className={stylesInput.input}
              placeholder="Посилання на TikTok сторинку"
            />
            <p className={styles.contactLabel}>
              Вебсайт <CgWebsite className={styles.contactIcon} />
            </p>
            <input
              type="text"
              name="WebSite"
              value={data.social?.WebSite || ""}
              onChange={handleChange}
              className={stylesInput.input}
              placeholder="Посилання на персональний WebSite"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Step5;
