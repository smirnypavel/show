import React, { useEffect, useState } from "react";
import styles from "@/styles/components/Artist/Mobile/MobileCat.module.css";
import { IoIosArrowBack } from "react-icons/io";
import axios from "axios";
import { ICategory } from "@/types/IAuth";
import { useRouter } from "next/router";
import MobileInfoPage from "./MobileInfoPage";
import Image from "next/image";
import muz_poslug from "@/public/baners/muz-poslug.jpeg";
import animator from "@/public/baners/animator.jpeg";
import designweding from "@/public/baners/designweding.jpeg";
import photo from "@/public/baners/photo.jpeg";
import logo123 from "@/public/baners/logo123.webp";
import muzPoslug from "@/public/icon/muzPoslug.svg";
import photoIcon from "@/public/icon/photoIcon.svg";
import catering from "@/public/icon/catering.svg";
import wedding from "@/public/icon/wedding.svg";
import animatorIcon from "@/public/icon/animator.svg";
import magic from "@/public/icon/magic.svg";

const MobileCat = () => {
  const [isCatContainerVisible, setIsCatContainerVisible] = useState(false);
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<ICategory | null>(
    null
  );
  const router = useRouter();
  const toggleCatContainer = () => {
    setIsCatContainerVisible(!isCatContainerVisible);
    // if (!isCatContainerVisible) {
    //   document.body.style.overflow = "hidden";
    // } else {
    //   document.body.style.overflow = "auto";
    // }
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
            {categories.map((cat) => (
              <li
                key={cat._id}
                onClick={(e) => handleCategoryChange(cat._id)}
                className={styles.catListItem}>
                <div className={styles.categoryImageContainer}>
                  {cat.name === "Музичні послуги" ? (
                    <Image
                      src={muz_poslug}
                      alt={"user photo"}
                      fill
                      className={styles.categoryImage}
                      sizes="(min-width: 808px) 50vw, 100vw"
                    />
                  ) : cat.name === "Анімаційні послуги" ? (
                    <Image
                      src={animator}
                      alt={"animator"}
                      fill
                      className={styles.categoryImage}
                      sizes="(min-width: 808px) 50vw, 100vw"
                    />
                  ) : cat.name === "Фото та відео" ? (
                    <Image
                      src={photo}
                      alt={"photo"}
                      fill
                      className={styles.categoryImage}
                      sizes="(min-width: 808px) 50vw, 100vw"
                    />
                  ) : cat.name === "Декорації та дизайн" ? (
                    <Image
                      src={designweding}
                      alt={"designweding"}
                      fill
                      className={styles.categoryImage}
                      sizes="(min-width: 808px) 50vw, 100vw"
                    />
                  ) : (
                    <Image
                      src={logo123}
                      alt={"placeholder"}
                      fill
                      className={styles.categoryImage}
                      sizes="(min-width: 808px) 50vw, 100vw"
                    />
                  )}

                  <div className={styles.iconContainer}>
                    {cat.name === "Музичні послуги" ? (
                      <Image
                        src={muzPoslug}
                        alt={"user photo"}
                        width={100}
                        height={100}
                        className={styles.categoryIcon}
                      />
                    ) : cat.name === "Анімаційні послуги" ? (
                      <Image
                        src={animatorIcon}
                        alt={"user photo"}
                        width={100}
                        height={100}
                        className={styles.categoryIcon}
                      />
                    ) : cat.name === "Фото та відео" ? (
                      <Image
                        src={photoIcon}
                        alt={"photo"}
                        width={100}
                        height={100}
                        className={styles.categoryIcon}
                      />
                    ) : cat.name === "Декорації та дизайн" ? (
                      <Image
                        src={catering}
                        alt={"user photo"}
                        width={100}
                        height={100}
                        className={styles.categoryIcon}
                      />
                    ) : (
                      <Image
                        src={magic}
                        alt={"placeholder"}
                        width={100}
                        height={100}
                        className={styles.categoryIcon}
                        sizes="(min-width: 808px) 50vw, 100vw"
                      />
                    )}
                  </div>
                </div>
                <div className={styles.categoryNameContainer}>
                  {cat.name} <IoIosArrowBack className={styles.catListIcon} />
                </div>
              </li>
            ))}
          </ul>
          <ul
            className={`${styles.subCatList} ${
              selectedCategory ? styles.show : ""
            }`}>
            {selectedCategory && (
              <p className={styles.subCatItem}> {selectedCategory?.name}</p>
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
