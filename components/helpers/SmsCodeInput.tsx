import React, { useState, useRef } from "react";
import styles from "@/styles/components/helpers/SmsCodeInput.module.css";
import Link from "next/link";
import Image from "next/image";
import ViberQrcode from "@/public/QRCode/ViberQrcode.png";
import TelegramQrcode from "@/public/QRCode/TelegramQrcode.png";
import axios from "axios";
import { toast } from "react-hot-toast";

const SmsCodeInput = () => {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);
  const [resp, setResp] = useState<any>([]);
  const [error, setError] = useState(false);
  const [shakeKey, setShakeKey] = useState(0);

  const handleCodeChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const { value } = event.target;
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    } else if (!value && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = async () => {
    const codeString = code.join("");
    setError(false);

    try {
      const response = await axios.post(`/orders/verify/${codeString}`);
      if (response.status === 200) {
        setResp(response.data);
        toast.success("Успешно отправлено");
        setError(false);
      } else {
        toast.error("Ошибка при отправке данных");
        setError(true);
        setShakeKey((prevKey) => prevKey + 1);
      }
    } catch (error) {
      toast.error("Ошибка при отправке данных");
      setError(true);
      setShakeKey((prevKey) => prevKey + 1);
    }
  };

  return (
    <div className={`${styles.smsForm} ${error ? styles.error : ""}`}>
      <p className={styles.label}>
        Для завершення публікації вашого запиту введіть код який вам надійшов у
        боті
      </p>

      <div className={styles.smsCodeInput}>
        {Array.from({ length: 6 }, (_, index) => (
          <input
            key={`${index}-${shakeKey}`} // Используем key для обновления анимации
            autoFocus={index === 0}
            type="number"
            maxLength={1}
            value={code[index]}
            onChange={(event) => handleCodeChange(event, index)}
            ref={(input) => {
              inputRefs.current[index] = input;
            }}
            className={`${styles.inputField} ${error ? styles.shake : ""}`}
          />
        ))}
      </div>
      <button
        className={styles.button}
        onClick={handleSubmit}>
        <div className="svg-wrapper-1">
          <div className={styles.svgWrapper}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="24"
              height="24">
              <path
                fill="none"
                d="M0 0h24v24H0z"></path>
              <path
                fill="currentColor"
                d="M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z"></path>
            </svg>
          </div>
        </div>
        <span className={styles.span}>Send</span>
      </button>
      <p className={styles.labelResend}>
        Для того щоб відправити запит до виконавців вам потрібно активувати бот
        та ввести код який ви отримаєте в боті. В подальшому в боті ви будете
        отримувати відгуки від виконавців.
      </p>
      <div className={styles.linkContainer}>
        <Link
          className={styles.linkBot}
          href="viber://pa?chatURI=wechirka"
          target="_blank">
          <Image
            src={ViberQrcode}
            fill
            alt={"qr code viber"}
            className={styles.qrCode}
          />
          Viber
        </Link>
        <Link
          className={styles.linkBot}
          href="https://t.me/WechirkaBot"
          target="_blank">
          <Image
            src={TelegramQrcode}
            fill
            alt={"qr code viber"}
            className={styles.qrCode}
          />
          Telegram
        </Link>
      </div>
    </div>
  );
};

export default SmsCodeInput;
