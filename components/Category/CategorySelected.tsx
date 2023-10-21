import React, { useState, useEffect } from "react";
import axios from "axios";
import { ICategory, ISubcategory } from "@/types/IAuth";
import { useAppDispatch } from "@/redux/hooks";
import { updateUser } from "@/redux/auth/authOperations";

const CategorySelector: React.FC = () => {
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedSubcategories, setSelectedSubcategories] = useState<string[]>(
    []
  );
  const [subcategories, setSubcategories] = useState<ISubcategory[]>([]);
  const [selectedItems, setSelectedItems] = useState<ICategory[]>([]);
  const [subcategoriesVisible, setSubcategoriesVisible] =
    useState<boolean>(false);
  const dispatch = useAppDispatch();

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
    }
  };

  const handleUpdateUserCategory = () => {
    dispatch(updateUser({ category: selectedItems }));
  };

  return (
    <div>
      <h2>Оберіть категорію:</h2>
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

      {selectedCategory && subcategoriesVisible && (
        <div>
          <h3>Оберіть підкатегорії:</h3>
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
          <button onClick={handleAddItems}>Обрати</button>
        </div>
      )}

      <h3>Вибрані Категорії:</h3>
      <ul>
        {selectedItems.map((item, index) => (
          <li key={index}>
            Категорія: {item.name}, Підкатегорії:{" "}
            {item.subcategories
              .map((subCategory) => subCategory.name)
              .join(", ")}
          </li>
        ))}
      </ul>
      <button
        type="button"
        onClick={handleUpdateUserCategory}>
        Зберегти
      </button>
    </div>
  );
};

export default CategorySelector;
