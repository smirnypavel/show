// components/UserUpdateForm.tsx
import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import CitySearch from "../helpers/searchCity";
import style from "../../styles/components/Profile/UserUpdateForm.module.css";
import { CloudinaryImage } from "./UploadImage";

export type UserUpdateFormValues = {
  firstName: string;
  lastName: string;
  title: string;
  description: string;
  phone: string;
  telegram: string;
  viber: string;
  whatsapp: string;
  price: string;
  // photo: string | CloudinaryImage[];
  [key: string]: string | string[] | CloudinaryImage[];
};

type Props = {
  initialValues: UserUpdateFormValues;
  onSubmit: (values: UserUpdateFormValues) => void;
};

const validationSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(3, "Мінімальна довжина – 3 символів")
    .max(50, "Максимальна довжина – 50 символів")
    .nullable(),
  lastName: Yup.string()
    .min(3, "ММінімальна довжина – 3 символів")
    .max(50, "Максимальна довжина – 50 символів")
    .nullable(),
  title: Yup.string()
    .min(3, "Мінімальна довжина – 10 символів")
    .max(50, "Максимальна довжина – 50 символів")
    .nullable(),
  description: Yup.string()
    .min(20, "Мінімальна довжина – 20 символів")
    .max(400, "Максимальна довжина – 400 символів")
    .nullable(),
  phone: Yup.string()
    .matches(/^\+?\d{1,15}$/, "Невірний формат телефона")
    .nullable(),
  telegram: Yup.string()
    .matches(/^\@[a-zA-Z\d_]{4,}$/i, "Неправильный формат Telegram")
    .test("telegramOrPhone", "Неправильный формат Telegram", function (value) {
      if (!value) {
        return true; // Поле пустое, валидация пройдена
      }
      if (value.match(/^\+?\d{1,15}$/)) {
        return true; // Введен номер телефона
      }
      return this.parent.telegram !== ""; // Если Telegram не пустой, то введен или номер или Telegram
    })
    .nullable(),
  viber: Yup.string()
    .matches(/^\+?\d{1,15}$/, "Неправильный формат Viber")
    .nullable(),
  whatsapp: Yup.string()
    .matches(/^\+?\d{1,15}$/, "Неправильный формат WhatsApp")
    .nullable(),
  price: Yup.string().nullable(),
});

const UserUpdateForm: React.FC<Props> = ({ initialValues, onSubmit }) => {
  const [selectedCity, setSelectedCity] = useState(""); // Состояние для выбранного города

  // Функция обновления локации
  const updateLocationField = (selectedCity: string) => {
    setSelectedCity(selectedCity);
  };

  const handleSubmit = (values: UserUpdateFormValues) => {
    const updatedValues = {
      ...values,
      location: selectedCity,
    };
    // Вызываем onSubmit с обновленными значениями
    onSubmit(updatedValues);
  };

  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}>
        {({ isSubmitting }) => (
          <Form className={style.container}>
            <div>
              <div className={style.formGroup}>
                <label htmlFor="firstName">Імя</label>
                <Field
                  type="text"
                  name="firstName"
                  className="form-control"
                  placeholder="Напишіть імя"
                />
                <ErrorMessage
                  name="firstName"
                  component="div"
                  className="text-danger"
                />
              </div>
              <div className={style.formGroup}>
                <label htmlFor="lastName">Прізвище</label>
                <Field
                  type="text"
                  name="lastName"
                  className="form-control"
                  placeholder="Напишіть Прізвище"
                />
                <ErrorMessage
                  name="lastName"
                  component="div"
                  className="text-danger"
                />
              </div>

              <div className={style.formGroup}>
                <label htmlFor="title">Заголовок</label>
                <Field
                  type="text"
                  name="title"
                  className="form-control"
                  placeholder="Напишіть заголовок"
                />
                <ErrorMessage
                  name="title"
                  component="div"
                  className="text-danger"
                />
              </div>
              <div className={style.formGroup}>
                <label htmlFor="description">Опис</label>
                <Field
                  as="textarea"
                  name="description"
                  className="form-control"
                  placeholder="Напишіть Опис"
                />
                <ErrorMessage
                  name="description"
                  component="div"
                  className="text-danger"
                />
              </div>
              <div className={style.formGroup}>
                <label htmlFor="location">Локація</label>
                <CitySearch onSelectCity={updateLocationField} />
                <ErrorMessage
                  name="location"
                  component="div"
                  className="text-danger"
                />
              </div>

              <div className={style.formGroup}>
                <label htmlFor="price">Ціна</label>
                <Field
                  type="text"
                  name="price"
                  className="form-control"
                  placeholder="Напишіть ціну"
                />
                <ErrorMessage
                  name="price"
                  component="div"
                  className="text-danger"
                />
              </div>
            </div>
            <div>
              <div className={style.formGroup}>
                <label htmlFor="phone">Телефон</label>
                <Field
                  type="text"
                  name="phone"
                  className="form-control"
                  placeholder="Напишіть телефон"
                />
                <ErrorMessage
                  name="phone"
                  component="div"
                  className="text-danger"
                />
              </div>
              <div className={style.formGroup}>
                <label htmlFor="telegram">Telegram</label>
                <Field
                  type="text"
                  name="telegram"
                  className="form-control"
                  placeholder="Напишіть Telegram або телефон"
                />
                <ErrorMessage
                  name="telegram"
                  component="div"
                  className="text-danger"
                />
              </div>
              <div className={style.formGroup}>
                <label htmlFor="viber">Viber</label>
                <Field
                  type="text"
                  name="viber"
                  className="form-control"
                  placeholder="Напишіть Viber"
                />
                <ErrorMessage
                  name="viber"
                  component="div"
                  className="text-danger"
                />
              </div>
              <div className={style.formGroup}>
                <label htmlFor="whatsapp">WhatsApp</label>
                <Field
                  type="text"
                  name="whatsapp"
                  className="form-control"
                  placeholder="Напишіть WhatsApp"
                />
                <ErrorMessage
                  name="whatsapp"
                  component="div"
                  className="text-danger"
                />
              </div>
            </div>
            <button
              type="submit"
              className="btn btn-primary"
              // disabled={isSubmitting}
            >
              Зберегти
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default UserUpdateForm;
