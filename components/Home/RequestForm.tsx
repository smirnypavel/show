import React, { useState } from "react";
import { Field, Form, Formik, ErrorMessage, FormikHelpers } from "formik";
import * as Yup from "yup";
import BadWordsNext from "bad-words-next";
import RequestFormCategorySelect from "@/components/Home/RequestFormCategorySelect";
import { ICategory } from "@/types/IAuth";
import { toast } from "react-hot-toast";
import axios from "axios";
import styles from "@/styles/Home/RequestForm.module.css";
import AutocompleteComponent from "../Layout/Header/ChooseLocation";
import Telegramlogo from "@/public/logo/Telegramlogo.svg";
import Viberlogo from "@/public/logo/Viberlogo.svg";
import Image from "next/image";
import DateTimePicker from "../helpers/DateTimePicker";
import Modal from "../helpers/Modal";
import SmsCodeInput from "../helpers/SmsCodeInput";
const badWordsFilter = new BadWordsNext();
badWordsFilter.add(require("bad-words-next/data/ru.json")); // Добавляем словарь для русского языка
badWordsFilter.add(require("bad-words-next/data/ua.json")); // Добавляем словарь для украинского языка

interface FormValues {
  phone: string;
  name: string;
  description: string;
  date: string;
  price?: string;
  [key: string]: string | ICategory[] | undefined;
  botLink?: string;
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
    .matches(/^\+?\d{10,15}$/, "Невірний формат телефона")
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
  // date: Yup.string().required("Обов'язкове поле"),
});

const RequestForm = () => {
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedItems, setSelectedItems] = useState<ICategory[]>([]);
  const [isPriceDisabled, setIsPriceDisabled] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleItemsSelect = (items: ICategory[]) => {
    setSelectedItems(items);
  };

  const handleCitySelect = (city: string) => {
    setSelectedCity(city);
  };
  const handleDateTimeSelect = (selectedDate: string) => {
    setSelectedDate(selectedDate);
  };
  const handleSubmit = async (
    values: FormValues,
    { setSubmitting }: FormikHelpers<FormValues>
  ) => {
    const filteredDescription = badWordsFilter.filter(values.description!);
    let phone = values.phone;
    if (phone.startsWith("+")) {
      phone = phone.substring(1); // Обрезаем плюс
    }
    const phoneAsNumber = +phone;
    let updatedValues = {
      ...values,
      description: filteredDescription,
      date: selectedDate,
      location: selectedCity,
      category: selectedItems,
      phone: phoneAsNumber,
    };

    if (isPriceDisabled) {
      delete updatedValues.price; // Удаляем поле "price" из объекта, если чекбокс "Договірний" выбран
    }

    try {
      // await axios.post("/orders", updatedValues);
      toast.success("Дані успішно відправлені на сервер");
      setIsModalOpen(true);
    } catch (error) {
      toast.error("Помилка при відправці даних на сервер:");
      console.error("Помилка при відправці даних на сервер:", error);
    }

    setSubmitting(false);
  };

  const handleCheckboxChange = (e: {
    target: { checked: boolean | ((prevState: boolean) => boolean) };
  }) => {
    setIsPriceDisabled(e.target.checked);
  };

  return (
    <div className={styles.form}>
      <div className={styles.title}>Форма створення запиту</div>

      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}>
        {({ isSubmitting }) => (
          <Form>
            <div className={styles.info}>
              <div className={styles.containerInfoCategory}>
                <div className={styles.inputContainer}>
                  <div className={styles.dangerContainer}>
                    <div className={styles.titleInfo}>
                      Особиста інформація *
                    </div>
                    <Field
                      type="text"
                      name="name"
                      placeholder="Iм'я"
                      className={styles.name}
                    />
                    <ErrorMessage
                      name="name"
                      component="div"
                      className={styles.textDanger}
                    />
                  </div>
                  <div className={styles.dangerContainer}>
                    <Field
                      type="text"
                      name="phone"
                      placeholder="Tелефон"
                      className={styles.phone}
                    />
                    <ErrorMessage
                      name="phone"
                      component="div"
                      className={styles.textDanger}
                    />
                  </div>
                </div>
                <RequestFormCategorySelect onItemsSelect={handleItemsSelect} />
              </div>
              <p className={styles.p}>
                Ваша особиста інформація не є доступною для інших користувачів
              </p>
              <div className={styles.description}>
                <div className={styles.titleInfo}>Опис *</div>
                <Field
                  as="textarea"
                  name="description"
                  placeholder="Танцівник народних танців, в українському народному костюмі
                на святкування Дня вишиванки в садочку"
                  className={styles.field}
                />
                <ErrorMessage
                  name="description"
                  component="div"
                  className={styles.textDanger}
                />
              </div>
              <div className={styles.titleLocation}>Локація *</div>
              <div className={styles.locationWrapper}>
                <AutocompleteComponent onCitySelect={handleCitySelect} />
                <Field
                  type="text"
                  name="address"
                  placeholder="Введіть назву вулиці"
                  className={styles.adressInput}
                />
                <ErrorMessage
                  name="address"
                  component="div"
                  className={styles.textDanger}
                />
              </div>
              <div className={styles.titleLocation}>Гонорар *</div>
              <div className={styles.priceWrapper}>
                <Field
                  type="text"
                  name="price"
                  placeholder="Вкажіть суму яку готові заплатити"
                  className={`${styles.name} ${
                    isPriceDisabled ? styles.disabled : ""
                  }`}
                  disabled={isPriceDisabled}
                />
                <ErrorMessage
                  name="price"
                  component="div"
                  className={styles.textDanger}
                />
                <div className={styles.checkboxWrapper}>
                  <input
                    type="checkbox"
                    onChange={handleCheckboxChange}
                    id="checkboxId" // Добавь уникальный ID для чекбокса
                  />
                  <label
                    htmlFor="checkboxId"
                    className={styles.checkBoxLabel}>
                    За домовленістю
                  </label>
                </div>
              </div>
            </div>
            <div className={styles.calendarBtn}>
              <label className={styles.textWrapper7}>
                Оберіть потрібну дату та час *
              </label>
              <DateTimePicker onDateTimeSelect={handleDateTimeSelect} />
            </div>

            <div className={styles.btnContainer}>
              <button
                type="submit"
                className={styles.submitButton}
                disabled={isSubmitting}>
                <div className={styles.textWrapper}> Створити запит</div>
              </button>
            </div>
          </Form>
        )}
      </Formik>
      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <SmsCodeInput />
        </Modal>
      )}
    </div>
  );
};

export default RequestForm;
