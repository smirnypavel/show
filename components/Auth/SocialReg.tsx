import React from "react";
import Link from "next/link";
import Image from "next/image";
import facebookLogo from "@/public/logo/facebookLogo.svg";
import GoogleLogo from "@/public/logo/GoogleLogo.svg";
import styles from "@/styles/components/Auth/SocialReg.module.css";
const SocialReg = () => {
  return (
    <div>
      <div className={styles.socialContainer}>
        <Link
          href="https://events-4qv2.onrender.com/users/facebook/login"
          className={styles.socialLink}>
          Увійти з допомогою
          <Image
            src={facebookLogo}
            alt={""}
          />
        </Link>{" "}
        <Link
          href="https://events-4qv2.onrender.com/users/google/login"
          className={styles.socialLink}>
          Увійти з допомогою
          <Image
            src={GoogleLogo}
            alt={""}
          />
        </Link>
      </div>
    </div>
  );
};

export default SocialReg;
