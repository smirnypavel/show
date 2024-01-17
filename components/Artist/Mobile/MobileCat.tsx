import React, { useEffect, useState } from "react";
import styles from "@/styles/components/Artist/Mobile/MobileCat.module.css";
import { IoIosArrowBack } from "react-icons/io";
import axios from "axios";
import { ICategory } from "@/types/IAuth";

const MobileCat = () => {
  const [isCatContainerVisible, setIsCatContainerVisible] = useState(false);
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<ICategory | null>(
    null
  );

  const toggleCatContainer = () => {
    setIsCatContainerVisible(!isCatContainerVisible);
    setSelectedCategory(null);
  };
  const returnButton = () => {
    setSelectedCategory(null);
  };
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
    // onCategoryChange(categoryId); // Передаем идентификатор категории в родительский компонент
    const selectedCategory = categories.find(
      (category) => category._id === categoryId
    );
    setSelectedCategory(selectedCategory || null);
    // setSelectedSubcategory(null);
  };

  return (
    <div>
      <button
        className={`${styles.buttonCat} ${
          isCatContainerVisible && styles.show
        }`}
        onClick={toggleCatContainer}>
        Обрати категорію
      </button>
      <div
        className={`${styles.catContainer} ${
          isCatContainerVisible && styles.show
        }`}>
        <div className={styles.catContainerNav}>
          <button
            className={styles.buttonNav}
            onClick={returnButton}>
            <IoIosArrowBack className={styles.buttonNavIcon} />
          </button>
          <button className={styles.buttonNav}>Скасувати</button>
        </div>
        <div className={styles.catListContainer}>
          <ul
            className={`${styles.catList} ${
              selectedCategory ? styles.hide : ""
            }`}>
            {categories.map((category) => (
              <li
                key={category._id}
                onClick={(e) => handleCategoryChange(category._id)}
                className={styles.catListItem}>
                <p className={styles.catListText}>{category.name}</p>
                <IoIosArrowBack className={styles.catListIcon} />
              </li>
            ))}
          </ul>
          <ul
            className={`${styles.subCatList} ${
              selectedCategory ? styles.show : ""
            }`}>
            {selectedCategory && (
              <p className={styles.catListItem}> {selectedCategory?.name}</p>
            )}
            {selectedCategory && (
              <p className={styles.subCatTitle}>
                Все в {selectedCategory?.name}
              </p>
            )}
            {selectedCategory &&
              selectedCategory.subcategories &&
              selectedCategory.subcategories.map((subCategory) => (
                <li
                  key={subCategory.id}
                  className={styles.subCatItem}
                  value={subCategory.id}>
                  {subCategory.name}
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MobileCat;
