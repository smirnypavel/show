// components/UserUpdateForm.tsx
import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";
import * as Yup from "yup";
import CitySearch from "../helpers/searchCity";
import { ImYoutube2 } from "react-icons/im";
import style from "../../styles/components/Profile/UserUpdateForm.module.css";

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
  video: string[];
  category: string;
  genre: string;
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
  category: Yup.string(),
  video: Yup.array().of(
    Yup.string().matches(
      /^(https?\:\/\/)?(www\.)?(youtube|youtu|youtube-nocookie)\.(com|be)\/.+$/,
      "Неправильный формат YouTube видео"
    )
  ),
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
                  placeholder="Напишіть имя"
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
                <label htmlFor="category">Категорія</label>
                <Field
                  type="text"
                  name="category"
                  className="form-control"
                  placeholder="Виберіть  категорію"
                />
                <ErrorMessage
                  name="category"
                  component="div"
                  className="text-danger"
                />
              </div>
              <div className={style.formGroup}>
                <label htmlFor="category">genre</label>
                <Field
                  type="text"
                  name="genre"
                  className="form-control"
                  placeholder="Виберіть  категорію"
                />
                <ErrorMessage
                  name="genre"
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
              <FieldArray name="video">
                {({ form, push, remove }) => (
                  <div>
                    {form.values.video &&
                      form.values.video.length > 0 &&
                      form.values.video.map((video: string, index: number) => (
                        <div key={index}>
                          <label htmlFor={`video[${index}]`}>
                            <ImYoutube2 className={style.icon} />
                          </label>
                          <Field
                            name={`video[${index}]`}
                            className="form-control"
                            placeholder="Вставьте линк на видео с YouTube"
                          />
                          <ErrorMessage
                            name={`video[${index}]`}
                            component="div"
                            className="text-danger"
                          />
                          <button
                            type="button"
                            onClick={() => remove(index)}>
                            Удалить видео
                          </button>
                        </div>
                      ))}
                    <button
                      type="button"
                      onClick={() => push("")}>
                      Добавить видео
                    </button>
                  </div>
                )}
              </FieldArray>
            </div>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={isSubmitting}>
              Зберегти
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default UserUpdateForm;
