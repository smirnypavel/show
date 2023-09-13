import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Link from "next/link";
import styles from "@/styles/components/Auth/LoginForm.module.css";
import { FcGoogle } from "react-icons/fc";
import { BsFacebook } from "react-icons/bs";

// Определите тип для данных формы
export type FormValues = {
  email: string; // Заменили username на email
  password: string;
};

// Определите тип для пропсов компонента
type Props = {
  onSubmit: (values: FormValues) => void;
};

const validationSchema = Yup.object().shape({
  email: Yup.string() // Заменили username на email
    .email("Неправильный формат почты")
    .required("Обязательное поле"),
  password: Yup.string()
    .min(8, "Минимальная длина пароля - 8 символов")
    .max(50, "Максимальная длина пароля - 50 символов")
    .required("Обязательное поле"),
});

const LoginForm: React.FC<Props> = ({ onSubmit }) => {
  // Состояние для отслеживания видимости пароля
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className={styles.container}>
      <div className={styles.socialContainer}>
        <Link href={""}>
          Войти с помощью <FcGoogle />{" "}
        </Link>
        <Link href={""}>
          Войти с помощью <BsFacebook />{" "}
        </Link>
      </div>

      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) => {
          // Вызываем вашу функцию обработки входа
          onSubmit(values);
          setSubmitting(false);
        }}>
        {({ isSubmitting }) => (
          <Form>
            <div className={styles.formGroup}>
              <label htmlFor="email">Почта</label>
              <Field
                type="email" // Заменили text на email
                name="email" // Заменили username на email
                className="form-control"
                placeholder="Введите почту"
                autoComplete="current-email" // Заменили current-username на current-email
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
                  autoComplete="current-password"
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

            <button
              type="submit"
              className="btn btn-primary"
              disabled={isSubmitting}>
              Войти
            </button>
          </Form>
        )}
      </Formik>
      <div>
        <p>Нет аккаунта?</p>
        <Link href={"/auth/registry"}>Зарегистрируйтесь</Link>
      </div>
    </div>
  );
};

export default LoginForm;
