import React, { useState, useRef, useEffect } from "react";
import styles from "@/styles/components/helpers/SmsCodeInput.module.css";
import Link from "next/link";
import Image from "next/image";
import ViberQrcode from "@/public/QRCode/ViberQrcode.png";
import TelegramQrcode from "@/public/QRCode/TelegramQrcode.png";

const SmsCodeInput = () => {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [timer, setTimer] = useState(60);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);

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
    }
  };

  const handleSubmit = () => {
    // Send the code to the server
    // You can implement the logic to send the code to the server here
    console.log("Sending code:", code.join(""));
  };

  // useEffect(() => {
  //   let interval: NodeJS.Timeout | null = null;

  //   if (isTimerRunning) {
  //     interval = setInterval(() => {
  //       setTimer((prevTimer) => prevTimer - 1);
  //     }, 1000);
  //   }

  //   if (timer === 0) {
  //     setIsTimerRunning(false);
  //   }

  //   return () => {
  //     if (interval) {
  //       clearInterval(interval);
  //     }
  //   };
  // }, [isTimerRunning, timer]);

  const handleResendClick = () => {
    setTimer(60);
    setIsTimerRunning(true);
    console.log("Resending code...");
  };
  useEffect(() => {
    if (!isTimerRunning) {
      setTimer(60);
      setIsTimerRunning(true);
    }
  }, []); // Empty dependency array to run the effect only on mount

  return (
    <div className={styles.smsForm}>
      <p className={styles.label}>
        Для завершення публікації вашого запиту введіть код який вам надійшов у
        боті
      </p>
      {/* <p className={styles.labelResend}>Відправити СМС повторно через</p>
      <button
        onClick={handleResendClick}
        className={styles.resendButton}
        disabled={isTimerRunning}>
        {isTimerRunning ? `00 : ${timer}` : "Відправити повторно"}
      </button> */}
      <div className={styles.smsCodeInput}>
        {Array.from({ length: 6 }, (_, index) => (
          <input
            autoFocus={index === 0}
            key={index}
            type="text"
            maxLength={1}
            value={code[index]}
            onChange={(event) => handleCodeChange(event, index)}
            ref={(input) => {
              inputRefs.current[index] = input;
            }}
            className={styles.inputField}
          />
        ))}
      </div>
      <button
        onClick={handleSubmit}
        className={styles.submitButton}>
        Далі
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
          viber
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
          telegram
        </Link>
      </div>
    </div>
  );
};

export default SmsCodeInput;
