import React, { useState } from "react";
import { Field, Form, Formik, ErrorMessage, FormikHelpers } from "formik";
import * as Yup from "yup";
import BadWordsNext from "bad-words-next";
import CitySearch from "@/components/helpers/searchCity";
import RequestFormCategorySelect from "@/components/Home/RequestFormCategorySelect";
import { ICategory } from "@/types/IAuth";
import { toast } from "react-hot-toast";
import axios from "axios";

const badWordsFilter = new BadWordsNext();
badWordsFilter.add(require("bad-words-next/data/ru.json")); // Добавляем словарь для русского языка
badWordsFilter.add(require("bad-words-next/data/ua.json")); // Добавляем словарь для украинского языка

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
  date: "",
  price: "",
};

const validationSchema = Yup.object().shape({
  phone: Yup.string()
    .matches(/^\+?\d{1,15}$/, "Невірний формат телефона")
    .required("Обов'язкове поле"),
  name: Yup.string()
    .min(3, "Мінімальна довжина – 3 символи")
    .max(50, "Максимальна довжина – 50 символів")
    .required("Обов'язкове поле"),
  description: Yup.string()
    .min(20, "Мінімальна довжина – 20 символів")
    .max(400, "Максимальна довжина – 400 символів")
    .nullable() // Поле может быть пустым или undefined
    .test(
      "profanity",
      "Опис містить нецензурні слова",
      (value) => !value || !badWordsFilter.check(value) // Проверка, если поле не пустое
    ),
  date: Yup.string().required("Обов'язкове поле"),
});

const RequestForm = () => {
  const [selectedCity, setSelectedCity] = useState("");
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
    const filteredDescription = badWordsFilter.filter(values.description!);
    const updatedValues = {
      ...values,
      description: filteredDescription,
      location: selectedCity,
      category: selectedItems,
    };

    try {
      await axios.post("/orders", updatedValues);
      toast.success("Дані успішно відправлені на сервер");
    } catch (error) {
      toast.error("Помилка при відправці даних на сервер:");
      console.error("Помилка при відправці даних на сервер:", error);
    }

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
              placeholder="Напишіть ім'я"
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
