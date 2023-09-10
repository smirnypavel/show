import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Link from "next/link";

// Определите тип для данных формы
export type FormValues = {
  username: string;
  password: string;
};

// Определите тип для пропсов компонента
type Props = {
  onSubmit: (values: FormValues) => void;
};

const validationSchema = Yup.object().shape({
  username: Yup.string()
    .min(3, "Минимальная длина имени пользователя - 3 символа")
    .max(50, "Максимальная длина имени пользователя - 50 символов")
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
    <>
      <Formik
        initialValues={{
          username: "",
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
            <div className="form-group">
              <label htmlFor="username">Имя пользователя</label>
              <Field
                type="text"
                name="username"
                className="form-control"
                placeholder="Введите имя пользователя"
                autocomplete="current-username"
              />
              <ErrorMessage
                name="username"
                component="div"
                className="text-danger"
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Пароль</label>
              <div className="input-group">
                <Field
                  type={showPassword ? "text" : "password"} // Изменение типа ввода в зависимости от showPassword
                  name="password"
                  className="form-control"
                  placeholder="Введите пароль"
                  autocomplete="current-password"
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
        <p>Hет акаунта </p>
        <Link href={"/auth/registry"}>зарегистрируйся</Link>
      </div>
    </>
  );
};

export default LoginForm;
