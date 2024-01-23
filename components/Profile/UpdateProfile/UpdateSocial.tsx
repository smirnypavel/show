import React, { useState } from "react";
import Image from "next/image";

import InputUi from "@/components/Ui/InputUi";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { getUser } from "@/redux/auth/authSelectors";
import styles from "@/styles/components/Profile/UpdateProfile/UpdateContactsSocial.module.css";
import { IoIosArrowDown } from "react-icons/io";
import { CgWebsite } from "react-icons/cg";
import instagram from "@/public/icon/instagram.svg";
import FacebookLogo from "@/public/icon/FacebookLogo.svg";
import YouTubeLogo from "@/public/icon/YouTubeLogo.svg";
import tiktokApp from "@/public/icon/tiktokApp.svg";
import { IUserAuth } from "@/types/IAuth";
import { updateUser } from "@/redux/auth/authOperations";

const UpdateContacts = () => {
  const dispatch = useAppDispatch();

  const [showSocial, setShowSocial] = useState(true);
  const user: IUserAuth = useAppSelector(getUser);

  const handleSubmitValue = (value: string, contactType: string) => {
    const socialData = {
      social: { [contactType]: value },
    };
    dispatch(updateUser(socialData));
  };

  const handleShowContacts = () => {
    setShowSocial(!showSocial);
  };
  const handleShowSocial = () => {
    setShowSocial(!showSocial);
  };

  return (
    <div className={styles.container}>
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
