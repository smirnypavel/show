import React, { useState } from "react";
import { Formik, Form, Field, FormikHelpers } from "formik";

export type AddCategoryValues = {
  category: string;
};

type Props = {
  initialValues: AddCategoryValues;
  onSubmit: (
    values: AddCategoryValues,
    formikHelpers: FormikHelpers<AddCategoryValues>
  ) => void;
};

const initialValues: AddCategoryValues = { category: "" };

const CategoryList = () => {
  const [category, setCategory] = useState("");

  const handleSubmit = (
    values: AddCategoryValues,
    { resetForm }: FormikHelpers<AddCategoryValues>
  ) => {
    setCategory(values.category);
    // Добавьте свою логику обработки сабмита

    // Очистите форму после успешного сабмита
    resetForm();
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
                name="category"
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
      <p>КАТЕГОРИЯ: {category}</p>
    </div>
  );
};

export default CategoryList;
