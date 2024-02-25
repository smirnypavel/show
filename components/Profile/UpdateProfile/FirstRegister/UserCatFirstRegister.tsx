import styles from "@/styles/components/Profile/UpdateProfile/FirstRegister/UserCatFirstRegister.module.css";
import React from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { deleteCat } from "@/redux/auth/authOperations";
import { IoClose } from "react-icons/io5";

import { getUser } from "@/redux/auth/authSelectors";
import CategorySelectorFirstReg from "./CategorySelectFirstReg";

const UserCatFirstRegister = () => {
  const user = useAppSelector(getUser);

  const dispatch = useAppDispatch();

  const handleDeleteCat = (_id: string) => {
    dispatch(deleteCat(_id));
  };
  const handleDeleteSubCat = (id: string) => {
    dispatch(deleteCat(id));
  };
  return (
    <div className={styles.container}>
      <p className={styles.title}>Оберіть категорії надання постуг</p>

      <div>
        <CategorySelectorFirstReg />
      </div>
      <p className={styles.catogoryTitle}>Категорії надання послуг</p>
      <div className={styles.categoryContainer}>
        {user.category.map(
          (cat) =>
            cat.subcategories.length > 0 &&
            cat.subcategories.length > 0 &&
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

export default UserCatFirstRegister;
