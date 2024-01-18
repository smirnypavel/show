import React, { useEffect, useState } from "react";
import styles from "@/styles/components/Artist/Mobile/MobileCat.module.css";
import { IoIosArrowBack } from "react-icons/io";
import axios from "axios";
import { ICategory } from "@/types/IAuth";
import { useRouter } from "next/router";
import MobileInfoPage from "./MobileInfoPage";

const MobileCat = () => {
  const [isCatContainerVisible, setIsCatContainerVisible] = useState(false);
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<ICategory | null>(
    null
  );
  const router = useRouter();
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
  const handleCategoryChange = (cat: string) => {
    const selectedCategory = categories.find(
      (category) => category._id === cat
    );
    router.push({
      pathname: "/artists",
      query: {
        // ...router.query,
        cat,
      },
    });
    setSelectedCategory(selectedCategory || null);
  };
  const handleSubCategoryChange = (subcat: string) => {
    router.push({
      pathname: "/artists",
      query: {
        ...router.query,
        subcat,
      },
    });
    setIsCatContainerVisible(false);
  };

  const handleCancel = () => {
    router.push({
      pathname: "/artists",
    });
    setIsCatContainerVisible(false);
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
          <button
            className={styles.buttonNav}
            onClick={handleCancel}>
            Скасувати
          </button>
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
              <p
                className={styles.subCatTitle}
                onClick={toggleCatContainer}>
                Все в {selectedCategory?.name}
              </p>
            )}
            {selectedCategory &&
              selectedCategory.subcategories &&
              selectedCategory.subcategories.map((subCategory) => (
                <li
                  key={subCategory.id}
                  className={styles.subCatItem}
                  onClick={(e) => handleSubCategoryChange(subCategory.id)}>
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
