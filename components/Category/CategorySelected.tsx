import React, { useState, useEffect } from "react";
import axios from "axios";
import { ICategory, ISubcategory } from "@/types/IAuth";
import { useAppDispatch } from "@/redux/hooks";
import { updateUser } from "@/redux/auth/authOperations";
import styles from "@/styles/components/Profile/UpdateProfile/CategorySelector.module.css";

const CategorySelector = () => {
  const dispatch = useAppDispatch();

  const [categories, setCategories] = useState<ICategory[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedSubcategories, setSelectedSubcategories] = useState<string[]>(
    []
  );

  const [subcategories, setSubcategories] = useState<ISubcategory[]>([]);
  const [selectedItems, setSelectedItems] = useState<ICategory[]>([]);
  const [subcategoriesVisible, setSubcategoriesVisible] =
    useState<boolean>(false);

  console.log(selectedItems);
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

  useEffect(() => {
    const selectedCategoryItem = categories.find(
      (category) => category._id === selectedCategory
    );
    if (selectedCategoryItem) {
      setSubcategories(selectedCategoryItem.subcategories);
    }
  }, [selectedCategory, categories]);

  // useEffect(() => {
  //   onItemsSelected(selectedItems);
  // }, [selectedItems]);

  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategory(categoryId);

    setSelectedSubcategories([]);
    setSubcategoriesVisible(true);
  };

  const handleSubcategoryChange = (subcategoryId: string) => {
    setSelectedSubcategories((prevSubcategories) => [
      ...prevSubcategories,
      subcategoryId,
    ]);
  };

  const handleAddItems = () => {
    const selectedCategoryItem = categories.find(
      (category) => category._id === selectedCategory
    );

    const selectedSubcategoryItems: ISubcategory[] =
      selectedCategoryItem?.subcategories.filter((subcategory) =>
        selectedSubcategories.includes(subcategory.id)
      ) || [];

    if (selectedCategoryItem && selectedSubcategoryItems.length > 0) {
      const newItem: ICategory = {
        _id: selectedCategoryItem._id,
        name: selectedCategoryItem.name,
        subcategories: selectedSubcategoryItems,
      };

      setSelectedItems([...selectedItems, newItem]);
      setSelectedSubcategories([]);
      setSubcategoriesVisible(false);
      handleUpdateUserCategory();
    }
  };

  const handleUpdateUserCategory = () => {
    dispatch(updateUser({ categories: selectedItems }));
  };

  return (
    <div className={styles.categoryContainer}>
      <select
        onChange={(e) => handleCategoryChange(e.target.value)}
        className={styles.name}>
        <option value="">Оберіть категорію</option>
        {categories.map((category) => (
          <option
            key={category._id}
            value={category._id}>
            {category.name}
          </option>
        ))}
      </select>
      {subcategoriesVisible && (
        <>
          <div className={styles.subcategoryContainer}>
            {subcategories.map((subCategory) => (
              <div key={subCategory.id}>
                <input
                  type="checkbox"
                  id={subCategory.id}
                  checked={selectedSubcategories.includes(subCategory.id)}
                  onChange={() => handleSubcategoryChange(subCategory.id)}
                />
                <label htmlFor={subCategory.id}>{subCategory.name}</label>
              </div>
            ))}
          </div>
          <button
            onClick={handleAddItems}
            className={styles.buttonSubmit}>
            Обрати
          </button>
        </>
      )}

      {/* <button
        type="button"
        onClick={handleUpdateUserCategory}>
        Зберегти
      </button> */}
    </div>
  );
};

export default CategorySelector;
