import React, { useState } from "react";
import { Formik, Form, Field, FormikHelpers } from "formik";
import axios, { AxiosResponse, all } from "axios";
import { ICategory } from "@/types/IAuth";

export type AddCategoryValues = {
  name: string;
};
export interface IResponse {
  _id: string;
  name: string;
  subcategories: any[];
  createdAt: string;
  updatedAt: string;
}

type Props = {
  initialValues: AddCategoryValues;
  onSubmit: (
    values: AddCategoryValues,
    formikHelpers: FormikHelpers<AddCategoryValues>
  ) => void;
};

const initialValues: AddCategoryValues = { name: "" };

const AddCategory = () => {
  const [category, setCategory] = useState<IResponse>();
  const [allCategory, setAllCategory] = useState<ICategory>();

  const handleSubmit = async (
    values: AddCategoryValues,
    { resetForm }: FormikHelpers<AddCategoryValues>
  ) => {
    const addCategory = async () => {
      try {
        const response: AxiosResponse<any, any> = await axios.post(
          "/users/category/add",
          { ...values }
        );
        await setCategory(response.data);
      } catch (error) {
        console.log("Error:", error);
      }
    };
    await addCategory();
    resetForm();
    const FetchCategory = async () => {
      try {
        const response: AxiosResponse<any, any> = await axios.get(
          "/users/category"
        );
        await setAllCategory(response.data);
      } catch (error) {
        console.log("Error:", error);
      }
    };
    await FetchCategory();
  };

  return (
    <div>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}>
        {({ isSubmitting }) => (
          <Form>
            <div>
              <label htmlFor="category">add category</label>
              <Field
                type="text"
                name="name"
                className="form-control"
                placeholder="Напишіть category"
              />
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
      {category != undefined && (
        <p>
          Вы усешно добавили ктегорию:{" "}
          {category?.name && category.name.toUpperCase()}{" "}
        </p>
      )}
      <ul>
        {" "}
        {Array.isArray(allCategory) &&
          allCategory.map((item) => {
            return <li key={item._id}> КАТЕГОРИЯ: {item.name}</li>;
          })}
      </ul>
    </div>
  );
};

export default AddCategory;
