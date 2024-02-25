import React, { useState } from "react";
import Image from "next/image";

import InputUi from "@/components/Ui/InputUi";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { getUser } from "@/redux/auth/authSelectors";
import styles from "@/styles/components/Profile/UpdateProfile/FirstRegister/UpdateContactFirstRegister.module.css";
import { HiOutlinePhone } from "react-icons/hi";
import { SiMaildotru } from "react-icons/si";
import { IoIosArrowDown } from "react-icons/io";
import TelegramLogo from "@/public/icon/TelegramLogo.svg";
import ViberLogo from "@/public/icon/ViberLogo.svg";
import WhatsApp from "@/public/icon/WhatsApp.svg";
import { IUserAuth } from "@/types/IAuth";
import { updateUser } from "@/redux/auth/authOperations";
import UpdateInputNew from "@/components/Ui/UpdateInputNew";

const UpdateContactsFirstRegister = () => {
  const dispatch = useAppDispatch();
  const [showContacts, setShowContacts] = useState(true);
  const [showSocial, setShowSocial] = useState(false);
  const user: IUserAuth = useAppSelector(getUser);

  const handleSubmitValue = (value: string, contactType: string) => {
    const contactData = {
      [contactType]: value,
    };
    dispatch(updateUser(contactData));
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
            <UpdateInputNew
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
            <UpdateInputNew
              onSubmit={(value) => handleSubmitValue(value, "telegram")}
              placeholder={user?.telegram ? user.telegram : "Введіть телеграм"}
            />
            <p className={styles.contactLabel}>
              Почта <SiMaildotru className={styles.contactIcon} />
            </p>
            <UpdateInputNew
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
            <UpdateInputNew
              onSubmit={(value) => handleSubmitValue(value, "viber")}
              placeholder={user?.viber ? user.viber : "Введіть вайбер"}
            />
            <p className={styles.contactLabel}>
              Вотсап{" "}
              <Image
                src={WhatsApp}
                alt="WhatsApp Logo"
                className={styles.contactIcon}
              />
            </p>
            <UpdateInputNew
              onSubmit={(value) => handleSubmitValue(value, "whatsapp")}
              placeholder={user?.whatsapp ? user.whatsapp : "Введіть вотсап"}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateContactsFirstRegister;
