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
  email: Yup.string() // Заменено имя поля на "email"
    .email("Некорректный адрес электронной почты")
    .required("Обязательное поле"),
  password: Yup.string()
    .min(8, "Минимальная длина пароля - 8 символов")
    .max(50, "Максимальная длина пароля - 50 символов")
    .required("Обязательное поле"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Пароли должны совпадать")
    .required("Обязательное поле"),
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
                Реєструючись, ви погоджуєтеся з умовами положення про збір і
                захист персональних даних та угодою користувача
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
      <div className={styles.registerLink}>
        <p>Зареєстровані?</p>
        <Link href={"/auth/login"}>Увійти</Link>
      </div>
      <div className={styles.socialContainer}>
        <Link
          href={""}
          className={styles.socialLink}>
          Зареєструватись з допомогою
          <Image
            src={facebookLogo}
            alt={""}
          />
        </Link>{" "}
        <Link
          href={""}
          className={styles.socialLink}>
          Зареєструватись з допомогою
          <Image
            src={GoogleLogo}
            alt={""}
          />
        </Link>
      </div>
    </div>
  );
};

export default RegistrationForm;
