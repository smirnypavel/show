import { Field, Form, Formik, ErrorMessage } from "formik";
import * as Yup from "yup";
import React, { useState } from "react";
import CitySearch from "@/components/helpers/searchCity";
import SearchBarCategorySelect from "@/components/Artist/SearchBarCategorySelect";
const initialValues = {
  phone: "",
  name: "",
  description: "",
};
const validationSchema = Yup.object().shape({
  phone: Yup.string()
    .matches(/^\+?\d{1,15}$/, "Невірний формат телефона")
    .required("Обовязкове поле"),
  name: Yup.string()
    .min(3, "Мінімальна довжина – 3 символів")
    .max(50, "Максимальна довжина – 50 символів")
    .required("Обовязкове поле"),
  description: Yup.string()
    .min(20, "Мінімальна довжина – 20 символів")
    .max(400, "Максимальна довжина – 400 символів")
    .nullable(),
});
const RequestForm = () => {
  const [selectedCity, setSelectedCity] = useState(""); // Состояние для выбранного города

  // Функция обновления локации
  const updateLocationField = (selectedCity: string) => {
    setSelectedCity(selectedCity);
  };
  const handleSubmit = () => {};
  return (
    <div>
      <p>RequestForm</p>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}>
        {({ isSubmitting }) => (
          <Form>
            <label htmlFor="name">Імя</label>
            <Field
              type="text"
              name="name"
              placeholder="Напишіть імя"
            />
            <ErrorMessage
              name="name"
              component="div"
              className="text-danger"
            />
            <label htmlFor="phone">Телефон</label>
            <Field
              type="text"
              name="phone"
              placeholder="Напишіть номер телефона"
            />
            <ErrorMessage
              name="phone"
              component="div"
              className="text-danger"
            />
            {/* <SearchBarCategorySelect /> */}
            <label htmlFor="description">Опис</label>
            <Field
              as="textarea"
              name="description"
              placeholder="Напишіть опис"
            />
            <ErrorMessage
              name="description"
              component="div"
              className="text-danger"
            />
            <label htmlFor="location">Локація</label>
            <CitySearch onSelectCity={updateLocationField} />
            <ErrorMessage
              name="location"
              component="div"
              className="text-danger"
            />
            <label htmlFor="datetime">Дата</label>
            <Field
              type="datetime-local"
              id="datetime"
              name="datetime"
            />
            <button
              type="submit"
              className="btn btn-primary"
              disabled={isSubmitting}>
              Відправити
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default RequestForm;
