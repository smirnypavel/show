import React, { useState, useEffect } from "react";
import axios from "axios";
import { ICategory, ISubcategory } from "@/types/IAuth";
import styles from "@/styles/components/Artist/SearchBarCategorySelect.module.css";

interface SearchBarCategorySelectProps {
  onCategoryChange: (categoryId: string) => void;
  onSubcategoryChange: (subcategoryId: string) => void;
}

const SearchBarCategorySelect: React.FC<SearchBarCategorySelectProps> = ({
  onCategoryChange,
  onSubcategoryChange,
}) => {
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
    onCategoryChange(categoryId); // Передаем идентификатор категории в родительский компонент
    const selectedCategory = categories.find(
      (category) => category._id === categoryId
    );
    setSelectedCategory(selectedCategory || null);
    setSelectedSubcategory(null);
  };

  const handleSubcategoryChange = (subcategoryId: string) => {
    onSubcategoryChange(subcategoryId); // Передаем идентификатор подкатегории в родительский компонент
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
      <p className={styles.selectCategorytext}>Оберіть потрібну категорію</p>
      <select
        onChange={(e) => handleCategoryChange(e.target.value)}
        className={styles.selectCategory}>
        <option value="">Категорія</option>
        {categories.map((category) => (
          <option
            key={category._id}
            value={category._id}>
            {category.name}
          </option>
        ))}
      </select>
      <select
        onChange={(e) => handleSubcategoryChange(e.target.value)}
        className={styles.selectCategory}>
        <option value="">Підкатегорія</option>
        {selectedCategory &&
          selectedCategory.subcategories &&
          selectedCategory.subcategories.map((subCategory) => (
            <option
              key={subCategory.id}
              value={subCategory.id}>
              {subCategory.name}
            </option>
          ))}
      </select>
    </div>
  );
};

export default SearchBarCategorySelect;
