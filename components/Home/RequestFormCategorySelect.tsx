import React, { useState, useEffect } from "react";
import axios from "axios";
import { ICategory } from "@/types/IAuth";
import styles from "./CategorySelect.module.css";

interface CategorySelectorProps {
  onItemsSelect: (selectedItems: ICategory[]) => void;
}

const CategorySelector: React.FC<CategorySelectorProps> = ({
  onItemsSelect,
}) => {
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>("");
  const [selectedItems, setSelectedItems] = useState<ICategory[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get<ICategory[]>("/users/category");
        setCategories(response.data);
      } catch (error) {
        console.error("Ошибка при загрузке категорий:", error);
      }
    };

    fetchCategories();
  }, []);

  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setSelectedSubcategory("");
  };

  const handleSubcategoryChange = (subcategoryId: string) => {
    setSelectedSubcategory(subcategoryId);
    const selectedCategoryItem = categories.find(
      (category) => category._id === selectedCategory
    );
    const selectedSubcategoryItem = selectedCategoryItem?.subcategories.find(
      (subcategory) => subcategory.id === subcategoryId
    );

    if (selectedCategoryItem && selectedSubcategoryItem) {
      const newItem: ICategory = {
        _id: selectedCategoryItem._id,
        name: selectedCategoryItem.name,
        subcategories: [
          {
            id: selectedSubcategoryItem.id,
            name: selectedSubcategoryItem.name,
          },
        ],
      };

      // Обновляем состояние на основе предыдущего состояния
      setSelectedItems((prevItems) => [...prevItems, newItem]);
    }
  };

  useEffect(() => {
    // Вызываем onItemsSelect с актуальными данными при изменении selectedItems
    onItemsSelect(selectedItems);
  }, [selectedItems, onItemsSelect]);

  return (
    <div>
      <p className={styles.title}>Оберіть потрібну категорію *</p>
      <select
        onChange={(e) => handleCategoryChange(e.target.value)}
        className={styles.name}>
        <option value="">Категорія</option>
        {categories.map((category) => (
          <option
            key={category._id}
            value={category._id}>
            {category.name}
          </option>
        ))}
      </select>
      <div>
        <select
          onChange={(e) => handleSubcategoryChange(e.target.value)}
          className={styles.name}>
          <option value="">Підкатегорія</option>
          {categories
            .find((category) => category._id === selectedCategory)
            ?.subcategories.map((subCategory) => (
              <option
                key={subCategory.id}
                value={subCategory.id}>
                {subCategory.name}
              </option>
            ))}
        </select>
      </div>
    </div>
  );
};

export default CategorySelector;
