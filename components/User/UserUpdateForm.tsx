// components/UserUpdateForm.tsx
import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import CitySearch from "../helpers/searchCity";

export type UserUpdateFormValues = {
  firstName: string;
  lastName: string;
  title: string;
  description: string;
  phone: string;
  telegram: string;
  viber: string;
  whatsapp: string;
  location: string;
  genre: string;
  price: string;
};

type Props = {
  initialValues: UserUpdateFormValues;
  onSubmit: (values: UserUpdateFormValues) => void;
};

const validationSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(3, "Минимальная длина - 3 символа")
    .max(50, "Максимальная длина - 50 символов")
    .required("Обязательное поле"),
  lastName: Yup.string()
    .min(3, "Минимальная длина - 3 символа")
    .max(50, "Максимальная длина - 50 символов")
    .required("Обязательное поле"),
  title: Yup.string()
    .min(3, "Минимальная длина - 3 символа")
    .max(50, "Максимальная длина - 50 символов")
    .required("Обязательное поле"),
  description: Yup.string()
    .min(20, "Минимальная длина - 20 символов")
    .max(500, "Максимальная длина - 500 символов"),
  phone: Yup.string().matches(/^\+?\d{1,15}$/, "Неправильный формат телефона"),
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
    }),

  viber: Yup.string().matches(/^\+?\d{1,15}$/, "Неправильный формат Viber"),
  whatsapp: Yup.string().matches(
    /^\+?\d{1,15}$/,
    "Неправильный формат WhatsApp"
  ),
  // location: Yup.string().required("Обязательное поле"),
  genre: Yup.string().required("Обязательное поле"),
  price: Yup.string(),
});

const UserUpdateForm: React.FC<Props> = ({ initialValues, onSubmit }) => {
  const [selectedCity, setSelectedCity] = useState(""); // Состояние для выбранного города

  // Функция обновления локации
  const updateLocationField = (selectedCity: string) => {
    setSelectedCity(selectedCity);
  };

  // Функция обработки отправки формы
  const handleSubmit = (values: UserUpdateFormValues) => {
    // Обновляем значения с выбранной локацией
    const updatedValues = { ...values, location: selectedCity };
    // Вызываем onSubmit с обновленными значениями
    onSubmit(updatedValues);
  };
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}>
      {({ isSubmitting }) => (
        <Form>
          <div className="form-group">
            <label htmlFor="firstName">Имя</label>
            <Field
              type="text"
              name="firstName"
              className="form-control"
              placeholder="Введите имя"
            />
            <ErrorMessage
              name="firstName"
              component="div"
              className="text-danger"
            />
          </div>
          <div className="form-group">
            <label htmlFor="lastName">Фамилия</label>
            <Field
              type="text"
              name="lastName"
              className="form-control"
              placeholder="Введите фамилию"
            />
            <ErrorMessage
              name="lastName"
              component="div"
              className="text-danger"
            />
          </div>
          <div className="form-group">
            <label htmlFor="title">Заголовок</label>
            <Field
              type="text"
              name="title"
              className="form-control"
              placeholder="Введите заголовок"
            />
            <ErrorMessage
              name="title"
              component="div"
              className="text-danger"
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Описание</label>
            <Field
              as="textarea"
              name="description"
              className="form-control"
              placeholder="Введите описание"
            />
            <ErrorMessage
              name="description"
              component="div"
              className="text-danger"
            />
          </div>
          <div className="form-group">
            <label htmlFor="phone">Телефон</label>
            <Field
              type="text"
              name="phone"
              className="form-control"
              placeholder="Введите телефон"
            />
            <ErrorMessage
              name="phone"
              component="div"
              className="text-danger"
            />
          </div>
          <div className="form-group">
            <label htmlFor="telegram">Telegram</label>
            <Field
              type="text"
              name="telegram"
              className="form-control"
              placeholder="Введите Telegram или телефон"
            />
            <ErrorMessage
              name="telegram"
              component="div"
              className="text-danger"
            />
          </div>
          <div className="form-group">
            <label htmlFor="viber">Viber</label>
            <Field
              type="text"
              name="viber"
              className="form-control"
              placeholder="Введите Viber"
            />
            <ErrorMessage
              name="viber"
              component="div"
              className="text-danger"
            />
          </div>
          <div className="form-group">
            <label htmlFor="whatsapp">WhatsApp</label>
            <Field
              type="text"
              name="whatsapp"
              className="form-control"
              placeholder="Введите WhatsApp"
            />
            <ErrorMessage
              name="whatsapp"
              component="div"
              className="text-danger"
            />
          </div>
          <div className="form-group">
            <label htmlFor="location">Локация</label>
            <CitySearch onSelectCity={updateLocationField} />
            <ErrorMessage
              name="location"
              component="div"
              className="text-danger"
            />
          </div>
          <div className="form-group">
            <label htmlFor="genre">Жанр</label>
            <Field
              type="text"
              name="genre"
              className="form-control"
              placeholder="Введите жанр"
            />
            <ErrorMessage
              name="genre"
              component="div"
              className="text-danger"
            />
          </div>

          <div className="form-group">
            <label htmlFor="price">Цена</label>
            <Field
              type="text"
              name="price"
              className="form-control"
              placeholder="Введите цену"
            />
            <ErrorMessage
              name="price"
              component="div"
              className="text-danger"
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary"
            disabled={isSubmitting}>
            Сохранить
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default UserUpdateForm;
