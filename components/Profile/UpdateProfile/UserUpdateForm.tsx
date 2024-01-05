// components/UserUpdateForm.tsx
import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
// import CitySearch from "../../helpers/searchCity";
import styles from "@/styles/components/Profile/UpdateProfile/UserUpdateForm.module.css";
import { useSelector } from "react-redux";
import { getUser } from "@/redux/auth/authSelectors";
import AutocompleteComponent from "@/components/Layout/Header/ChooseLocation";
import { FaCheck } from "react-icons/fa6";
import { FiPlus } from "react-icons/fi";

// import RequestFormCategorySelect from "@/components/Home/RequestFormCategorySelect";
// import { ICategory } from "@/types/IAuth";
import CategorySelector from "@/components/Category/CategorySelected";
import { useAppDispatch } from "@/redux/hooks";
import { updateUser } from "@/redux/auth/authOperations";

export type UserUpdateFormValues = {
  firstName: string;
  title: string;
  price: string;
  description: string;
};

const validationSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(3, "Мінімальна довжина – 3 символів")
    .max(50, "Максимальна довжина – 50 символів")
    .nullable(),
  title: Yup.string()
    .min(3, "Мінімальна довжина – 10 символів")
    .max(50, "Максимальна довжина – 50 символів")
    .nullable(),
  price: Yup.string().nullable(),
});

const UserUpdateForm = () => {
  const user = useSelector(getUser);
  const dispatch = useAppDispatch();
  const [selectedCity, setSelectedCity] = useState(""); // Состояние для выбранного города
  // const [selectedItems, setSelectedItems] = useState<ICategory[]>([]);
  // const [userCategory, setUserCategory] = useState<ICategory[]>(user.category);

  // Функция обновления локации
  const updateLocationField = (selectedCity: string) => {
    setSelectedCity(selectedCity);
  };
  const initialValues: UserUpdateFormValues = {
    firstName: "",
    title: "",
    price: "",
    description: "",
  };
  const handleSubmit = (values: UserUpdateFormValues) => {
    // Функция для фильтрации пустых значений
    const removeEmptyValues = (obj: any) =>
      Object.fromEntries(
        Object.entries(obj).filter(([_, v]) => v !== "" && v !== null)
      );

    // Удаляем пустые значения из объекта значений
    let filteredValues = removeEmptyValues({
      ...values,
    });

    if (selectedCity.trim() !== "") {
      filteredValues = {
        ...filteredValues,
        location: selectedCity,
      };
    }
    // if (selectedItems.length !== 0) {
    //   filteredValues = {
    //     ...filteredValues,
    //     category: selectedItems,
    //   };
    // }
    // Вызываем onSubmit с обновленными значениями
    dispatch(updateUser(filteredValues));
  };

  // const handleItemsSelect = (items: ICategory[]) => {
  //   const updatedCategories = [...userCategory, ...items];
  //   setSelectedItems(items);
  //   setUserCategory(updatedCategories);
  // };

  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}>
        {({ isSubmitting }) => (
          <Form className={styles.container}>
            <div>
              <div className={styles.infoContainer}>
                <div>
                  <div className={styles.formGroup}>
                    <label
                      htmlFor="firstName"
                      className={styles.formInputTitle}>
                      Ім’я
                    </label>
                    <Field
                      type="text"
                      name="firstName"
                      className={styles.input}
                      placeholder={user.firstName}
                    />
                    <ErrorMessage
                      name="firstName"
                      component="div"
                      className="text-danger"
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label
                      htmlFor="title"
                      className={styles.formInputTitle}>
                      Заголовок
                    </label>
                    <Field
                      type="text"
                      name="title"
                      className={styles.input}
                      placeholder={user.title}
                    />
                    <ErrorMessage
                      name="title"
                      component="div"
                      className="text-danger"
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label
                      htmlFor="price"
                      className={styles.formInputTitle}>
                      ₴
                    </label>
                    <Field
                      type="text"
                      name="price"
                      className={styles.input}
                      placeholder={user.price}
                    />
                    <ErrorMessage
                      name="price"
                      component="div"
                      className="text-danger"
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label
                      htmlFor="location"
                      className={styles.formInputTitle}>
                      Місто
                      <AutocompleteComponent
                        onCitySelect={updateLocationField}
                      />
                    </label>

                    <p className={styles.input}>
                      {selectedCity.trim() !== ""
                        ? selectedCity
                        : user?.location ?? "Введіть назву міста"}
                    </p>
                  </div>
                </div>
                <button
                  type="submit"
                  className={styles.buttonSubmit}>
                  <FaCheck className={styles.updateLinkIcon} /> Зберегти
                </button>
              </div>
              <div>
                <div className={styles.descriptionContainer}>
                  <label
                    htmlFor="description"
                    className={styles.formInputTitle}>
                    Про себе
                  </label>
                  <Field
                    as="textarea"
                    name="description"
                    className={styles.description}
                    placeholder={user.description}
                  />
                  <ErrorMessage
                    name="description"
                    component="div"
                    className="text-danger"
                  />
                  <div>
                    <div className={styles.addButton}>
                      <FiPlus className={styles.addIcon} />
                      Додати категорії
                    </div>
                    {/* <CategorySelector onItemsSelected={handleItemsSelect} /> */}
                    <CategorySelector />
                  </div>
                  <p className={styles.formInputTitle}>
                    Категорії надання послуг
                  </p>
                  <div className={styles.categoryContainer}>
                    {user.category.map((cat) => (
                      <div
                        className={styles.categoryArtist}
                        key={cat._id}>
                        {cat.name}
                      </div>
                    ))}
                  </div>
                  <p className={styles.catogoryTitle}>Підкатегорія</p>
                  <div className={styles.categoryContainer}>
                    {user.category.map((cat) =>
                      cat.subcategories.map((subCat) => (
                        <div
                          className={styles.categoryArtist}
                          key={subCat.id}>
                          {subCat.name}
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default UserUpdateForm;
