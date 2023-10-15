import React, { useEffect, useState } from "react";
import { ICategory } from "@/types/IAuth";
import axios from "axios";

const CategorySelector = () => {
  const [selectedSubcategories, setSelectedSubcategories] = useState<{
    [key: string]: boolean;
  }>({});
  const [categories, setCategories] = useState<ICategory[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("/users/category");
        const fetchedCategories: ICategory[] = response.data;
        setCategories(fetchedCategories);
      } catch (error) {
        console.error("Ошибка при загрузке категорий:", error);
        // Здесь можно добавить обработку ошибки, например, показать сообщение пользователю
      }
    };

    fetchCategories();
  }, []); // Запрос будет выполнен при монтировании компонента

  const handleCategoryChange = (categoryId: string) => {
    setSelectedSubcategories((prevSelectedSubcategories) => ({
      ...prevSelectedSubcategories,
      [categoryId]: !prevSelectedSubcategories[categoryId],
    }));
  };

  return (
    <div>
      <h2>Оберіть категорію:</h2>
      <ul>
        {categories.map((category) => (
          <li key={category._id}>
            <button onClick={() => handleCategoryChange(category._id)}>
              {category.name}
            </button>
            {selectedSubcategories[category._id] && category.subcategories && (
              <ul>
                {category.subcategories.map((subCategory) => (
                  <li key={subCategory.id}>{subCategory.name}</li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategorySelector;
