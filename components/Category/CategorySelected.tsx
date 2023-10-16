import React, { useEffect, useState } from "react";
import { ICategory, ISubcategory } from "@/types/IAuth";
import axios from "axios";

const CategorySelector = () => {
  const [selectedCategory, setSelectedCategory] = useState<ICategory | null>(
    null
  );
  const [selectedSubcategory, setSelectedSubcategory] =
    useState<ISubcategory | null>(null);
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

  return (
    <div>
      <h2>Оберіть категорію:</h2>
      <select
        onChange={(e) =>
          setSelectedCategory(
            categories.find((cat) => cat._id === e.target.value) || null
          )
        }>
        <option value="">Выберите категорию</option>
        {categories.map((category) => (
          <option
            key={category._id}
            value={category._id}>
            {category.name}
          </option>
        ))}
      </select>

      {selectedCategory && selectedCategory.subcategories && (
        <div>
          <h3>Выберите подкатегорию:</h3>
          <select
            onChange={(e) =>
              setSelectedSubcategory(
                selectedCategory.subcategories.find(
                  (subcat) => subcat.id === e.target.value
                ) || null
              )
            }>
            <option value="">Выберите подкатегорию</option>
            {selectedCategory.subcategories.map((subCategory) => (
              <option
                key={subCategory.id}
                value={subCategory.id}>
                {subCategory.name}
              </option>
            ))}
          </select>
        </div>
      )}

      {selectedCategory && <p>Выбранная категория: {selectedCategory.name}</p>}
      {selectedSubcategory && (
        <p>Выбранная подкатегория: {selectedSubcategory.name}</p>
      )}
    </div>
  );
};

export default CategorySelector;
