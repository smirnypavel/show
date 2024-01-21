import React, { useState } from "react";
import Image from "next/image";

import InputUi from "@/components/Ui/InputUi";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { getUser } from "@/redux/auth/authSelectors";
import styles from "@/styles/components/Profile/UpdateProfile/UpdateContactsSocial.module.css";
import { HiOutlinePhone } from "react-icons/hi";
import { SiMaildotru } from "react-icons/si";
import { IoIosArrowDown } from "react-icons/io";
import { CgWebsite } from "react-icons/cg";
import TelegramLogo from "@/public/icon/TelegramLogo.svg";
import instagram from "@/public/icon/instagram.svg";
import FacebookLogo from "@/public/icon/FacebookLogo.svg";
import ViberLogo from "@/public/icon/ViberLogo.svg";
import YouTubeLogo from "@/public/icon/YouTubeLogo.svg";
import WhatsApp from "@/public/icon/WhatsApp.svg";
import tiktokApp from "@/public/icon/tiktokApp.svg";
import { IUserAuth } from "@/types/IAuth";
import { updateUser } from "@/redux/auth/authOperations";

const UpdateContacts = () => {
  const dispatch = useAppDispatch();
  const [showContacts, setShowContacts] = useState(true);
  const [showSocial, setShowSocial] = useState(false);
  const user: IUserAuth = useAppSelector(getUser);

  const handleSubmitValue = (value: string, contactType: string) => {
    // Делай что-то с полученным значением value
    // console.log("Submitted value:", value);
    // dispatch(updateUser(value));
    const contactData = {
      [contactType]: value,
    };
    console.log(contactData);
  };
  const handleShowContacts = () => {
    setShowContacts(!showContacts);
    setShowSocial(!showSocial);
  };
  const handleShowSocial = () => {
    setShowSocial(!showSocial);
    setShowContacts(!showContacts);
  };

  return (
    <div className={styles.container}>
      <div>
        <p
          className={`${styles.contactsTitle} ${
            !showContacts && styles.titleClose
          }`}
          onClick={handleShowContacts}>
          Ваші контактні данні
          <IoIosArrowDown
            className={`${styles.iconArrow} ${showContacts && styles.up}`}
          />
        </p>
        <div
          className={`${styles.contactsContainer} ${
            showContacts ? styles.show : styles.hide
          }`}>
          <div>
            <p className={styles.contactLabel}>
              Телефон <HiOutlinePhone className={styles.contactIcon} />
            </p>
            <InputUi
              onSubmit={(value) => handleSubmitValue(value, "phone")}
              placeholder={user?.phone ? user.phone : "Введіть номер телефону"}
            />
            <p className={styles.contactLabel}>
              Телеграм
              <Image
                src={TelegramLogo}
                alt="Telegram Logo"
                className={styles.contactIcon}
              />
            </p>
            <InputUi
              onSubmit={(value) => handleSubmitValue(value, "telegram")}
              placeholder={user?.telegram ? user.telegram : "Введіть телеграм"}
            />
            <p className={styles.contactLabel}>
              Почта <SiMaildotru className={styles.contactIcon} />
            </p>
            <InputUi
              onSubmit={(value) => handleSubmitValue(value, "email")}
              placeholder={user?.email ? user.email : "Введіть почту"}
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
            <InputUi
              onSubmit={(value) => handleSubmitValue(value, "viber")}
              placeholder={user?.viber ? user.viber : "Введіть вайбер"}
            />
            <p className={styles.contactLabel}>
              Вотсап{" "}
              <Image
                src={WhatsApp}
                alt="WhatsApp Logo"
                className={styles.contactIconWhatsapp}
              />
            </p>
            <InputUi
              onSubmit={(value) => handleSubmitValue(value, "whatsapp")}
              placeholder={user?.whatsapp ? user.whatsapp : "Введіть вотсап"}
            />
          </div>
        </div>
      </div>
      <div>
        <p
          className={`${styles.contactsTitle} ${
            !showSocial && styles.titleClose
          }`}
          onClick={handleShowSocial}>
          Ваші соціальні сторінки або Вебсайт
          <IoIosArrowDown
            className={`${styles.iconArrow} ${showSocial && styles.up}`}
          />
        </p>
        <div
          className={`${styles.socialContainer} ${
            showSocial ? styles.show : styles.hide
          }`}>
          <div>
            <p className={styles.contactLabel}>
              Facebook{" "}
              <Image
                src={FacebookLogo}
                alt="Viber Logo"
                className={styles.contactIcon}
              />
            </p>
            <InputUi
              onSubmit={(value) => handleSubmitValue(value, "Facebook")}
              placeholder={
                user?.social?.Facebook
                  ? user.social.Facebook
                  : "Введіть facebook"
              }
            />
            <p className={styles.contactLabel}>
              Instagram{" "}
              <Image
                src={instagram}
                alt="Viber Logo"
                className={styles.contactIcon}
              />
            </p>
            <InputUi
              onSubmit={(value) => handleSubmitValue(value, "Instagram")}
              // onSubmit={handleSubmitValue}
              placeholder={
                user?.social?.Instagram
                  ? user.social.Instagram
                  : "Введіть instagram"
              }
            />
            <p className={styles.contactLabel}>
              YouTube{" "}
              <Image
                src={YouTubeLogo}
                alt="Viber Logo"
                className={styles.contactIcon}
              />
            </p>
            <InputUi
              // onSubmit={handleSubmitValue}
              onSubmit={(value) => handleSubmitValue(value, "Youtube")}
              placeholder={
                user?.social?.Youtube ? user.social.Youtube : "Введіть youtube"
              }
            />{" "}
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
            <InputUi
              // onSubmit={handleSubmitValue}
              onSubmit={(value) => handleSubmitValue(value, "TikTok")}
              placeholder={
                user?.social?.TikTok ? user.social.TikTok : "Введіть tik-tok"
              }
            />
            <p className={styles.contactLabel}>
              Вебсайт <CgWebsite className={styles.contactIcon} />
            </p>
            <InputUi
              // onSubmit={handleSubmitValue}
              onSubmit={(value) => handleSubmitValue(value, "WebSite")}
              placeholder={
                user?.social?.WebSite ? user.social.WebSite : "Введіть Вебсайт"
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateContacts;
