import React, { useEffect, useState } from "react";
import styles from "@/styles/components/Artist/Mobile/MobileCat.module.css";
import { IoIosArrowBack } from "react-icons/io";
import axios from "axios";
import { ICategory } from "@/types/IAuth";

const MobileCat = () => {
  const [isCatContainerVisible, setIsCatContainerVisible] = useState(false);
  const [categories, setCategories] = useState<ICategory[]>([]);

  const toggleCatContainer = () => {
    setIsCatContainerVisible(!isCatContainerVisible);
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
          <button className={styles.buttonNav}>
            <IoIosArrowBack className={styles.buttonNavIcon} />
          </button>
          <button className={styles.buttonNav}>Скасувати</button>
        </div>
        <div className={styles.catListContainer}>
          <ul className={styles.catList}>
            {categories.map((category) => (
              <li
                key={category._id}
                className={styles.catListItem}>
                <p className={styles.catListText}>{category.name}</p>
                <IoIosArrowBack className={styles.catListIcon} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MobileCat;
