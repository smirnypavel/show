import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Link from "next/link";
import styles from "@/styles/components/Auth/LoginForm.module.css";
import { FcGoogle } from "react-icons/fc";
// import { BsFacebook } from "react-icons/bs";
import facebookLogo from "@/public/logo/facebookLogo.svg";
import GoogleLogo from "@/public/logo/GoogleLogo.svg";
import { PiEyeClosed } from "react-icons/pi";
import { PiEye } from "react-icons/pi";
import Image from "next/image";
import Modal from "../helpers/Modal";

export type FormValues = {
  email: string;
  password: string;
};

type Props = {
  onSubmit: (values: FormValues, rememberPassword: boolean) => void;
};

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Некоректний формат пошти")
    .required("Обов'язкове поле"),
  password: Yup.string()
    .min(8, "Мінімальна довжина пароля – 8 символів")
    .max(50, "Максимальна довжина пароля – 50 символів")
    .required("Обов'язкове поле"),
});

const LoginForm: React.FC<Props> = ({ onSubmit }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [rememberPassword, setRememberPassword] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [email, setEmail] = useState("");
  const [emailSent, setEmailSent] = useState(false); // Добавленное состояние
  const OpenModal = () => {
    setShowModal(true);
  };
  const closeModal = () => {
    setShowModal(false);
    setEmailSent(false); // Сбрасываем состояние после закрытия модального окна
  };
  const sendEmail = async () => {
    await fetch("https://events-4qv2.onrender.com/users/forgot-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    setEmailSent(true); // Устанавливаем состояние после отправки письма
  };

  return (
    <div className={styles.container}>
      <p className={styles.loginTitle}>Увійти</p>
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) => {
          onSubmit(values, rememberPassword);
          setSubmitting(false);
        }}>
        {({ isSubmitting }) => (
          <Form>
            <div className={styles.form}>
              <div className={styles.dangerContainer}>
                <div className={styles.formGroup}>
                  <label
                    htmlFor="email"
                    className={styles.inputTitle}>
                    Номер телефону або ел. почта
                  </label>
                  <Field
                    type="email"
                    name="email"
                    className={styles.loginInput}
                    placeholder="+380"
                    autoComplete="current-email"
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
                    Пароль
                  </label>
                  <div className={styles.inputGroup}>
                    <Field
                      type={showPassword ? "text" : "password"}
                      name="password"
                      className={styles.passwordInput}
                      placeholder="Введите пароль"
                      autoComplete={rememberPassword ? "on" : "off"}
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

              <div className={styles.serviceContainer}>
                <div className={styles.rememberedContainer}>
                  <Field
                    type="checkbox"
                    id="rememberPassword"
                    name="rememberPassword"
                    checked={rememberPassword}
                    className={styles.rememberPasswordCheckbox}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setRememberPassword(e.target.checked)
                    }
                  />
                  <label
                    htmlFor="rememberPassword"
                    className={styles.rememberedText}>
                    Запам’ятати мене
                  </label>
                </div>
                <div className={styles.forgotPasswordContainer}>
                  <button
                    type="button"
                    onClick={OpenModal}
                    className={styles.forgotPassword}>
                    Забули пароль?
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className={styles.submitButton}
                disabled={isSubmitting}>
                <div className={styles.textWrapper}>Увійти</div>
              </button>
            </div>
          </Form>
        )}
      </Formik>
      <div className={styles.registerLink}>
        <Link href={"/auth/registry"}>Зареєструватись</Link>
      </div>
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
      {showModal && (
        <Modal onClose={closeModal}>
          <div className={styles.forgotPasswordModal}>
            <p className={styles.forgotPasswordTitle}>Відновлення паролю</p>

            {emailSent ? ( // Проверяем состояние, чтобы показать сообщение после отправки
              <div className={styles.forgotPasswordForm}>
                <p className={styles.forgotPasswordTitle}>
                  Лист з новим паролем відправлено на вашу пошту
                </p>
                <button
                  type="button"
                  className={styles.forgotPasswordSubmitButton}
                  onClick={closeModal}>
                  <div className={styles.textWrapper}>Закрити</div>
                </button>
              </div>
            ) : (
              <div>
                <p className={styles.forgotPasswordText}>
                  Введіть адресу електронної пошти, пов’язану з вашим акаунтом.
                  Ми надішлемо вам новий пароль.
                </p>
                <div className={styles.forgotPasswordForm}>
                  <input
                    type="email"
                    name="email"
                    className={styles.forgotPasswordInput}
                    placeholder="Введіть пошту"
                    autoComplete="current-email"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <button
                    type="button"
                    className={styles.forgotPasswordSubmitButton}
                    onClick={sendEmail}>
                    <div className={styles.textWrapper}>Відправити</div>
                  </button>
                </div>
              </div>
            )}
          </div>
        </Modal>
      )}
    </div>
  );
};

export default LoginForm;
