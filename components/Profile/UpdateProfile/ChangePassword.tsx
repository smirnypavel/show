import React from "react";
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import * as Yup from "yup";
import styles from "@/styles/components/Profile/UpdateProfile/ChangePassword.module.css";
import { useAppDispatch } from "@/redux/hooks";
import { updatePassword } from "@/redux/auth/authOperations";

interface FormValues {
  oldPassword: string;
  password: string;
  confirmPassword: string;
}
const ChangePassword = () => {
  const dispatch = useAppDispatch();
  const initialValues: FormValues = {
    oldPassword: "",
    password: "",
    confirmPassword: "",
  };

  const validationSchema = Yup.object().shape({
    oldPassword: Yup.string().required("Обов'язково"),
    password: Yup.string()
      .required("Обов'язково")
      .min(8, "Мінімальна довжина 8 символів"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), ""], "Паролі мають співпадати")
      .required("Обов'язково"),
  });

  const handleSubmit = (
    values: FormValues,
    { resetForm }: FormikHelpers<FormValues>
  ) => {
    // Действия при отправке формы, например, отправка данных на сервер
    dispatch(
      updatePassword({
        oldPassword: values.oldPassword,
        password: values.password,
      })
    );
    console.log(values);
    // resetForm(); // Опционально для сброса значений формы после успешной отправки
  };

  return (
    <div className={styles.changePasswordContainer}>
      <div className={styles.changePasswordTitle}>Змінити пароль</div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}>
        {({ isSubmitting }) => (
          <Form className={styles.formContainer}>
            <div className={styles.changePasswordInputContainer}>
              <div className={styles.changePasswordInputTitle}>
                Старий пароль
              </div>
              <Field
                className={styles.changePasswordInput}
                type="password"
                name="oldPassword"
              />
              <ErrorMessage
                name="oldPassword"
                component="div"
                className={styles.error}
              />
            </div>
            <div className={styles.changePasswordInputContainer}>
              <div className={styles.changePasswordInputTitle}>
                Новий пароль
              </div>
              <Field
                className={styles.changePasswordInput}
                type="password"
                name="password"
              />
              <ErrorMessage
                name="password"
                component="div"
                className={styles.error}
              />
            </div>
            <div className={styles.changePasswordInputContainer}>
              <div className={styles.changePasswordInputTitle}>
                Повторіть новий пароль
              </div>
              <Field
                className={styles.changePasswordInput}
                type="password"
                name="confirmPassword"
              />
              <ErrorMessage
                name="confirmPassword"
                component="div"
                className={styles.error}
              />
            </div>
            <button
              className={styles.changePasswordButton}
              type="submit"
              disabled={isSubmitting}>
              Змінити пароль
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ChangePassword;
