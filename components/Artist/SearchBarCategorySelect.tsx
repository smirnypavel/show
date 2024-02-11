import React, { useState, useEffect } from "react";
import axios from "axios";
import { ICategory, ISubcategory } from "@/types/IAuth";
import styles from "@/styles/components/Artist/SearchBarCategorySelect.module.css";
import { useRouter } from "next/router";

// interface SearchBarCategorySelectProps {
//   onCategoryChange: (categoryId: string) => void;
//   onSubcategoryChange: (subcategoryId: string) => void;
// }

const SearchBarCategorySelect = () => {
  const router = useRouter();
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
        console.error("Помилка прі отриманні категрій:", error);
        // Здесь можно добавить обработку ошибки, например, показать сообщение пользователю
      }
    };

    fetchCategories();
  }, []);

  const handleCategoryChange = (cat: string) => {
    router.push({
      pathname: "/artists",
      query: {
        ...router.query,
        cat,
      },
    });
    const selectedCategory = categories.find(
      (category) => category._id === cat
    );
    setSelectedCategory(selectedCategory || null);
    setSelectedSubcategory(null);
  };

  const handleSubcategoryChange = (subcat: string) => {
    router.push({
      pathname: "/artists",
      query: {
        ...router.query,
        subcat,
      },
    });
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
