import styles from "@/styles/components/Profile/UpdateProfile/UserCat.module.css";
import React from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { deleteCat } from "@/redux/auth/authOperations";
import { IoClose } from "react-icons/io5";
import CategorySelector from "@/components/Category/CategorySelected";
import { FiPlus } from "react-icons/fi";
import { getUser } from "@/redux/auth/authSelectors";

const UserCat = () => {
  const user = useAppSelector(getUser);

  const dispatch = useAppDispatch();

  const handleDeleteCat = (_id: string) => {
    dispatch(deleteCat(_id));
  };
  const handleDeleteSubCat = (id: string) => {
    dispatch(deleteCat(id));
  };
  return (
    <div>
      <div>
        <div className={styles.addButton}>
          <FiPlus className={styles.addIcon} />
          Додати категорії
        </div>
        <CategorySelector />
      </div>
      <p className={styles.formInputTitle}>Категорії надання послуг</p>

      <div className={styles.categoryContainer}>
        {user.category.map((cat) => (
          <div
            className={styles.categoryArtist}
            key={cat._id}>
            {cat.name}
            <button
              type="button"
              className={styles.deleteButton}
              onClick={() => handleDeleteCat(cat._id)}>
              <IoClose className={styles.deleteButtonIcon} />
            </button>
          </div>
        ))}
      </div>
      <p className={styles.catogoryTitle}>Підкатегорія</p>
      <div className={styles.categoryContainer}>
        {user.category.map((cat) =>
          cat.subcategories.map((subCat) => (
            <div
              className={styles.categoryArtist}
              key={subCat.id}>
              {subCat.name}
              <button
                type="button"
                className={styles.deleteButton}
                onClick={() => handleDeleteSubCat(subCat.id)}>
                <IoClose className={styles.deleteButtonIcon} />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default UserCat;
