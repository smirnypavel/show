import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Link from "next/link";
import Image from "next/image";
import styles from "@/styles/components/Auth/RegistrationForm.module.css";
import { PiEyeClosed } from "react-icons/pi";
import { PiEye } from "react-icons/pi";
import facebookLogo from "@/public/logo/facebookLogo.svg";
import GoogleLogo from "@/public/logo/GoogleLogo.svg";
import SocialReg from "./SocialReg";
// Определите тип для данных формы
export type FormValues = {
  firstName: string;
  phone: string;
  email: string; // Заменено имя поля на "email"
  password: string;
  confirmPassword: string;
};

// Определите тип для пропсов компонента
type Props = {
  onSubmit: (values: FormValues) => void;
};

const validationSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(3, "Мінімальна довжина - 3 символи")
    .max(50, "Максимальна довжина - 50 символів")
    .required("Обов'язкове поле"),
  phone: Yup.string()
    .min(10, "Мінімальна довжина - 10 символів")
    .max(13, "Максимальна довжина - 13 символів")
    .required("Обов'язкове поле"),
  email: Yup.string() // Заменено имя поля на "email"
    .email("Некоректна адреса електронної пошти")
    .required("Обов'язкове поле"),
  password: Yup.string()
    .min(8, "Мінімальна довжина пароля - 8 символів")
    .max(50, "Максимальна довжина пароля - 50 символів")
    .required("Обов'язкове поле"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Паролі повинні збігатися")
    .required("Обов'язкове поле"),
});

const RegistrationForm: React.FC<Props> = ({ onSubmit }) => {
  // Состояние для отслеживания видимости пароля
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className={styles.container}>
      <p className={styles.loginTitle}>Зареєструватись</p>

      <Formik
        initialValues={{
          firstName: "",
          phone: "",
          email: "", // Заменено имя поля на "email"
          password: "",
          confirmPassword: "",
        }}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) => {
          // Вызываем вашу функцию обработки регистрации
          onSubmit(values);
          setSubmitting(false);
        }}>
        {({ isSubmitting }) => (
          <Form>
            <div className={styles.form}>
              <div className={styles.dangerContainer}>
                <div className={styles.formGroup}>
                  <label
                    htmlFor="firstName"
                    className={styles.inputTitle}>
                    Ім’я
                  </label>
                  <Field
                    type="text"
                    name="firstName"
                    className={styles.loginInput}
                    placeholder="Ім’я"
                  />
                  <ErrorMessage
                    name="firstName"
                    component="div"
                    className={styles.textDanger}
                  />
                </div>
              </div>
              <div className={styles.dangerContainer}>
                <div className={styles.formGroup}>
                  <label
                    htmlFor="phone"
                    className={styles.inputTitle}>
                    Номер телефону
                  </label>
                  <Field
                    type="text"
                    name="phone"
                    className={styles.loginInput}
                    placeholder="+380"
                  />
                  <ErrorMessage
                    name="phone"
                    component="div"
                    className={styles.textDanger}
                  />
                </div>
              </div>
              <div className={styles.dangerContainer}>
                <div className={styles.formGroup}>
                  <label
                    htmlFor="email"
                    className={styles.inputTitle}>
                    Електронна почта
                  </label>
                  <Field
                    type="text"
                    name="email"
                    className={styles.loginInput}
                    placeholder="exampl@exampl.com"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className={styles.textDanger}
                  />
                </div>
              </div>
              <div className={styles.dangerContainer}>
                <div className={styles.formGroup}>
                  <label
                    htmlFor="password"
                    className={styles.inputTitle}>
                    Придумайте пароль
                  </label>
                  <div className={styles.inputGroup}>
                    <Field
                      type={showPassword ? "text" : "password"}
                      name="password"
                      className={styles.passwordInput}
                      placeholder=""
                    />
                    <div className="input-group-append">
                      <button
                        type="button"
                        className={styles.showButton}
                        onClick={() => setShowPassword(!showPassword)}>
                        {showPassword ? (
                          <PiEye className={styles.showIcon} />
                        ) : (
                          <PiEyeClosed className={styles.showIcon} />
                        )}
                      </button>
                    </div>
                  </div>
                  <ErrorMessage
                    name="password"
                    component="div"
                    className={styles.textDangerPassword}
                  />
                </div>
              </div>
              <div className={styles.dangerContainer}>
                <div className={styles.formGroup}>
                  <label
                    htmlFor="confirmPassword"
                    className={styles.inputTitle}>
                    Введіть пароль повторно
                  </label>
                  <Field
                    type={showPassword ? "text" : "password"}
                    name="confirmPassword"
                    className={styles.passwordInput}
                    placeholder=""
                  />
                  <ErrorMessage
                    name="confirmPassword"
                    component="div"
                    className={styles.textDangerPassword}
                  />
                </div>
              </div>
              <div className={styles.textRegister}>
                Реєструючись, ви погоджуєтеся з умовами{" "}
                <Link
                  href="/privacy/privacy_offer.pdf"
                  target="_blank"
                  className={styles.linkPrivacy}>
                  {" "}
                  положення про збір, захист персональних даних
                </Link>{" "}
                та{" "}
                <Link
                  href="/public/public-offer"
                  target="_blank"
                  className={styles.linkPrivacy}>
                  угодою користувача
                </Link>
              </div>
              <button
                type="submit"
                className={styles.submitButton}
                disabled={isSubmitting}>
                <div className={styles.textWrapper}>Зареєструватись</div>
              </button>
            </div>
          </Form>
        )}
      </Formik>
      <SocialReg />
    </div>
  );
};

export default RegistrationForm;
