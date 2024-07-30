import React, { useEffect, ChangeEvent } from "react";
import { StepProps } from "@/types/IRegFormData";
import stylesInput from "@/styles/components/Profile/UpdateProfile/FirstRegister/FirstRegNew/Step1.module.css";
import styles from "@/styles/components/Profile/UpdateProfile/FirstRegister/UpdateContactFirstRegister.module.css";
import { HiOutlinePhone } from "react-icons/hi";
import Image from "next/image";
import { useAppSelector } from "@/redux/hooks";
import { getUser } from "@/redux/auth/authSelectors";
import TelegramLogo from "@/public/icon/TelegramLogo.svg";
import { SiMaildotru } from "react-icons/si";
import ViberLogo from "@/public/icon/ViberLogo.svg";
import WhatsApp from "@/public/icon/WhatsApp.svg";

const Step2: React.FC<StepProps> = ({ data, setData }) => {
  const user = useAppSelector(getUser);

  useEffect(() => {
    if (!data.phone && user.phone) {
      setData((prevData) => ({ ...prevData, phone: user.phone }));
    }
    if (!data.email && user.email) {
      setData((prevData) => ({ ...prevData, email: user.email }));
    }
  }, [user, data, setData]);

  const formatTelegramUsername = (input: string): string => {
    const regex = /^(?:https:\/\/t\.me\/|@)?(\w+)$/;
    const match = input.match(regex);
    return match ? match[1] : input;
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    const formattedValue =
      name === "telegram" ? formatTelegramUsername(value) : value;
    setData((prevData) => ({ ...prevData, [name]: formattedValue }));
  };

  return (
    <div className={styles.container}>
      <div>
        <p className={styles.contactsTitle}>Ваші контактні данні </p>
        <div className={styles.socialContainer}>
          <ContactInput
            label="Телефон"
            icon={<HiOutlinePhone className={styles.contactIcon} />}
            name="phone"
            value={data.phone || ""}
            onChange={handleChange}
          />
          <ContactInput
            label="Телеграм"
            icon={
              <Image
                src={TelegramLogo}
                alt="Telegram Logo"
                className={styles.contactIcon}
              />
            }
            name="telegram"
            value={data.telegram || ""}
            onChange={handleChange}
          />
          <ContactInput
            label="Пошта"
            icon={<SiMaildotru className={styles.contactIcon} />}
            name="email"
            value={data.email || ""}
            onChange={handleChange}
          />
          <ContactInput
            label="Вайбер"
            icon={
              <Image
                src={ViberLogo}
                alt="Viber Logo"
                className={styles.contactIcon}
              />
            }
            name="viber"
            value={data.viber || ""}
            onChange={handleChange}
          />
          <ContactInput
            label="Вотсап"
            icon={
              <Image
                src={WhatsApp}
                alt="WhatsApp Logo"
                className={styles.contactIcon}
              />
            }
            name="whatsapp"
            value={data.whatsapp || ""}
            onChange={handleChange}
          />
        </div>
      </div>
    </div>
  );
};

interface ContactInputProps {
  label: string;
  icon: React.ReactNode;
  name: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const ContactInput: React.FC<ContactInputProps> = ({
  label,
  icon,
  name,
  value,
  onChange,
}) => (
  <div>
    <p className={styles.contactLabel}>
      {label} {icon}
    </p>
    <input
      type="text"
      name={name}
      value={value}
      onChange={onChange}
      className={stylesInput.input}
    />
  </div>
);

export default Step2;
