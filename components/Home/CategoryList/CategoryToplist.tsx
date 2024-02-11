import { ICategory } from "@/types/IAuth";
import axios from "axios";
import Image from "next/image";
import muz_poslug from "@/public/baners/muz-poslug.jpeg";
import animator from "@/public/baners/animator.jpeg";
import designweding from "@/public/baners/designweding.jpeg";
import photo from "@/public/baners/photo.jpeg";
import muzPoslug from "@/public/icon/muzPoslug.svg";
import photoIcon from "@/public/icon/photoIcon.svg";
import catering from "@/public/icon/catering.svg";
import wedding from "@/public/icon/wedding.svg";
import animatorIcon from "@/public/icon/animator.svg";

import React, { useEffect, useState } from "react";
import styles from "@/styles/Home/CategoryList/CategoryToplist.module.css";

const CategoryToplist = () => {
  const [categories, setCategories] = useState<ICategory[]>([]);

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
  return (
    <div className={styles.container}>
      <p className={styles.title}>Топ категорій</p>
      <p className={styles.titleText}>
        Категорії в яких найбільше шукають виконавця
      </p>
      <div className={styles.categoryArtistList}>
        {categories.length === 0 ? (
          <div className={styles.categoryArtist}>Категорії не обрані</div>
        ) : (
          categories.slice(0, 4).map((cat) => (
            <div
              className={styles.categoryItem}
              key={cat._id}>
              <div className={styles.categoryImageContainer}>
                {cat.name === "Музичні послуги" && (
                  <Image
                    src={muz_poslug}
                    alt={"user photo"}
                    fill
                    className={styles.categoryImage}
                    sizes="(min-width: 808px) 50vw, 100vw"
                  />
                )}
                {cat.name === "Анімаційні послуги" && (
                  <Image
                    src={animator}
                    alt={"animator"}
                    fill
                    className={styles.categoryImage}
                    sizes="(min-width: 808px) 50vw, 100vw"
                  />
                )}
                {cat.name === "Фото та відео" && (
                  <Image
                    src={photo}
                    alt={"photo"}
                    fill
                    className={styles.categoryImage}
                    sizes="(min-width: 808px) 50vw, 100vw"
                  />
                )}
                {cat.name === "Декорації та дизайн" && (
                  <Image
                    src={designweding}
                    alt={"designweding"}
                    fill
                    className={styles.categoryImage}
                    sizes="(min-width: 808px) 50vw, 100vw"
                  />
                )}

                <div className={styles.iconContainer}>
                  {cat.name === "Музичні послуги" && (
                    <Image
                      src={muzPoslug}
                      alt={"user photo"}
                      // fill
                      width={100}
                      height={100}
                      className={styles.categoryIcon}
                      // sizes="(min-width: 808px) 50vw, 100vw"
                    />
                  )}
                  {cat.name === "Анімаційні послуги" && (
                    <Image
                      src={animatorIcon}
                      alt={"user photo"}
                      // fill
                      width={100}
                      height={100}
                      className={styles.categoryIcon}
                      // sizes="(min-width: 808px) 50vw, 100vw"
                    />
                  )}
                  {cat.name === "Фото та відео" && (
                    <Image
                      src={photoIcon}
                      alt={"photo"}
                      // fill
                      width={100}
                      height={100}
                      className={styles.categoryIcon}
                      // sizes="(min-width: 808px) 50vw, 100vw"
                    />
                  )}
                  {cat.name === "Декорації та дизайн" && (
                    <Image
                      src={catering}
                      alt={"user photo"}
                      // fill
                      width={100}
                      height={100}
                      className={styles.categoryIcon}
                      // sizes="(min-width: 808px) 50vw, 100vw"
                    />
                  )}
                </div>
              </div>
              <div className={styles.categoryNameContainer}>{cat.name}</div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CategoryToplist;