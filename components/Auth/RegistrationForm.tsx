import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Link from "next/link";
import styles from "@/styles/components/Auth/LoginForm.module.css";

// Определите тип для данных формы
export type FormValues = {
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
      <Formik
        initialValues={{
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
            <div className={styles.formGroup}>
              <label htmlFor="email">Почта</label>{" "}
              {/* Заменено имя поля на "email" */}
              <Field
                type="text"
                name="email" // Заменено имя поля на "email"
                className="form-control"
                placeholder="Введите адрес электронной почты"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-danger"
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="password">Пароль</label>
              <div className="input-group">
                <Field
                  type={showPassword ? "text" : "password"}
                  name="password"
                  className="form-control"
                  placeholder="Введите пароль"
                />
                <div className="input-group-append">
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? "Скрыть" : "Показать"} пароль
                  </button>
                </div>
              </div>
              <ErrorMessage
                name="password"
                component="div"
                className="text-danger"
              />
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword">Подтвердите пароль</label>
              <Field
                type={showPassword ? "text" : "password"}
                name="confirmPassword"
                className="form-control"
                placeholder="Подтвердите пароль"
              />
              <ErrorMessage
                name="confirmPassword"
                component="div"
                className="text-danger"
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary"
              disabled={isSubmitting}>
              Зарегистрироваться
            </button>
          </Form>
        )}
      </Formik>
      <div>
        <p>Есть аккаунт</p>
        <Link href={"/auth/login"}>Войти</Link>
      </div>
    </div>
  );
};

export default RegistrationForm;
