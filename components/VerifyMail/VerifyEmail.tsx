import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { verifyMail } from "@/redux/auth/authOperations";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import Link from "next/link";
import styles from "@/styles/components/VerifyMail/VerifyMail.module.css";
import { isFirstReg } from "@/redux/auth/authSelectors";

const VerifyEmail = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const isReg = useAppSelector(isFirstReg);

  const token = router.query.token;

  useEffect(() => {
    const verifiedMail = async () => {
      try {
        if (typeof token === "string") {
          await dispatch(verifyMail(token));
        }
      } catch (error) {}
    };
    if (token) {
      verifiedMail();
    }
  }, [token]);
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        {!isReg ? (
          <div className={styles.contentWrapper}>
            <h1>Вітаю ви успішно підтвердили пошту)</h1>
            <h2>
              Для того щоб завершити реестрацію Вам потрібно налаштувати профіль
            </h2>
            <Link
              className={styles.buttonLink}
              href={"/profile/first-register"}>
              Далі
            </Link>
          </div>
        ) : (
          <div className={styles.contentWrapper}>
            <h1>Ви вже підтвердили пошту</h1>
            <Link
              className={styles.buttonLink}
              href={"/profile"}>
              Перейти до профілю
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default VerifyEmail;
