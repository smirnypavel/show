import React, { useEffect, useState, ChangeEvent } from "react";
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

  // States to track if each field has been manually changed
  const [isPhoneChanged, setIsPhoneChanged] = useState(false);
  const [isEmailChanged, setIsEmailChanged] = useState(false);
  const [isTelegramChanged, setIsTelegramChanged] = useState(false);
  const [isViberChanged, setIsViberChanged] = useState(false);
  const [isWhatsAppChanged, setIsWhatsAppChanged] = useState(false);

  useEffect(() => {
    if (!data.phone && user.phone) {
      setData((prevData) => ({ ...prevData, phone: user.phone }));
    }
    if (!data.email && user.email) {
      setData((prevData) => ({ ...prevData, email: user.email }));
    }
    if (!data.telegram && user.telegram) {
      setData((prevData) => ({ ...prevData, telegram: user.telegram }));
    }
    if (!data.viber && user.viber) {
      setData((prevData) => ({ ...prevData, viber: user.viber }));
    }
    if (!data.whatsapp && user.whatsapp) {
      setData((prevData) => ({ ...prevData, whatsapp: user.whatsapp }));
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

    // Update state for tracking if the field has been manually changed
    switch (name) {
      case "phone":
        setIsPhoneChanged(true);
        break;
      case "email":
        setIsEmailChanged(true);
        break;
      case "telegram":
        setIsTelegramChanged(true);
        break;
      case "viber":
        setIsViberChanged(true);
        break;
      case "whatsapp":
        setIsWhatsAppChanged(true);
        break;
      default:
        break;
    }

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
            placeholder="Номер телефону"
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
            placeholder="Посилання на профіль або нік в Telegram"
          />
          <ContactInput
            label="Пошта"
            icon={<SiMaildotru className={styles.contactIcon} />}
            name="email"
            value={data.email || ""}
            onChange={handleChange}
            placeholder="Ваша пошта"
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
            placeholder="Номер Viber"
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
            placeholder="Номер WhatsApp"
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
  placeholder: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const ContactInput: React.FC<ContactInputProps> = ({
  placeholder,
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
      placeholder={placeholder}
    />
  </div>
);

export default Step2;
