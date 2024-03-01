import React from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "@/styles/components/Profile/UpdateProfile/FirstRegister/FinishReg.module.css";
import ViberQrcode from "@/public/QRCode/ViberQrcode.png";
import TelegramQrcode from "@/public/QRCode/TelegramQrcode.png";

const FinishReg = () => {
  return (
    <div>
      <p className={styles.labelResend}>
        Для завершення реєстрації вам необхідно зареєструватись у чат-боті на
        ваш вибір. Після цього ви зможете отримувати відгуки та керувати
        повідомленнями.
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

export default FinishReg;
