import React, { useState } from "react";
import { Field, Form, Formik, ErrorMessage, FormikHelpers } from "formik";
import * as Yup from "yup";
import CitySearch from "@/components/helpers/searchCity";
import RequestFormCategorySelect from "@/components/Home/RequestFormCategorySelect";
import { ICategory } from "@/types/IAuth";
import { toast } from "react-hot-toast";
import axios from "axios";

interface FormValues {
  phone: string;
  name: string;
  description: string;
  date: string;
  price: string;
}

const initialValues: FormValues = {
  phone: "",
  name: "",
  description: "",
  date: "", // Добавленное поле для даты и времени
  price: "", // Добавленное поле для даты и времени
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
    .min(1, "Мінімальна довжина – 20 символів")
    .max(400, "Максимальна довжина – 400 символів")
    .nullable(),
  date: Yup.string().required("Обовязкове поле"), // Валидация для поля datetime
});

const RequestForm = () => {
  const [selectedCity, setSelectedCity] = useState(""); // Состояние для выбранного города
  const [selectedItems, setSelectedItems] = useState<ICategory[]>([]);

  const handleItemsSelect = (items: ICategory[]) => {
    setSelectedItems(items);
  };

  const updateLocationField = (selectedCity: string) => {
    setSelectedCity(selectedCity);
  };
  const handleSubmit = async (
    values: FormValues,
    { setSubmitting }: FormikHelpers<FormValues>
  ) => {
    const updatedValues = {
      ...values,
      location: selectedCity,
      category: selectedItems,
    };
    console.log("Данные из формы:", updatedValues);

    try {
      // Отправка данных на сервер
      await axios.post("/orders", updatedValues);
      toast.success("Данные успешно отправлены на сервер");

      console.log("Данные успешно отправлены на сервер");

      // Добавьте здесь логику для обработки успешной отправки данных, если это необходимо
    } catch (error) {
      toast.error("Ошибка при отправке данных на сервер:");

      console.error("Ошибка при отправке данных на сервер:", error);
      // Добавьте здесь логику обработки ошибки при отправке данных на сервер
    }

    // Не забудьте вызвать метод setSubmitting(false) для завершения процесса отправки формы
    setSubmitting(false);
  };

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
            <label htmlFor="price">Бюджет</label>
            <Field
              type="text"
              name="price"
              placeholder="Бюджет"
            />
            <ErrorMessage
              name="price"
              component="div"
              className="text-danger"
            />

            <RequestFormCategorySelect onItemsSelect={handleItemsSelect} />

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

            <label htmlFor="datetime">Дата і час</label>
            <Field
              type="datetime-local"
              id="datetime"
              name="date"
            />
            <ErrorMessage
              name="date"
              component="div"
              className="text-danger"
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
