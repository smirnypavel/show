import React, { useState, useEffect } from "react";
import axios from "axios";
import { ICategory, ISubcategory } from "@/types/IAuth";
import styles from "@/styles/components/Artist/SearchBarCategorySelect.module.css";

const SearchBarCategorySelect: React.FC = () => {
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<ICategory | null>(
    null
  );
  const [selectedSubcategory, setSelectedSubcategory] =
    useState<ISubcategory | null>(null);
  const [selectedItems, setSelectedItems] = useState<
    { categoryId: string; subcategoryId: string }[]
  >([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get<ICategory[]>("/users/category");
        setCategories(response.data);
      } catch (error) {
        console.error("Ошибка при загрузке категорий:", error);
        // Здесь можно добавить обработку ошибки, например, показать сообщение пользователю
      }
    };

    fetchCategories();
  }, []);

  const handleCategoryChange = (categoryId: string) => {
    const selectedCategory = categories.find(
      (category) => category._id === categoryId
    );
    setSelectedCategory(selectedCategory || null);
    setSelectedSubcategory(null);
  };

  const handleSubcategoryChange = (subcategoryId: string) => {
    const selectedSubcategory = selectedCategory?.subcategories.find(
      (subcategory) => subcategory.id === subcategoryId
    );
    if (selectedCategory && selectedSubcategory) {
      setSelectedItems([
        ...selectedItems,
        {
          categoryId: selectedCategory._id,
          subcategoryId: selectedSubcategory.id,
        },
      ]);
    }
  };

  return (
    <div className={styles.container}>
      <p>Оберіть категорію:</p>
      <select onChange={(e) => handleCategoryChange(e.target.value)}>
        <option value="">Оберіть категорію</option>
        {categories.map((category) => (
          <option
            key={category._id}
            value={category._id}>
            {category.name}
          </option>
        ))}
      </select>

      {selectedCategory && selectedCategory.subcategories && (
        <div className={styles.container}>
          <p>Оберіть підкатегорії:</p>
          <select onChange={(e) => handleSubcategoryChange(e.target.value)}>
            <option value="">Оберіть підкатегорії</option>
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
    </div>
  );
};

export default SearchBarCategorySelect;
