import React, { ChangeEvent, useState } from "react";
import styles from "@/styles/components/Profile/UpdateProfile/UserUpdateDescription.module.css";
import { FaCheck } from "react-icons/fa6";
import { LuPencil } from "react-icons/lu";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { getUser } from "@/redux/auth/authSelectors";

const UserUpdateDescription = () => {
  const user = useAppSelector(getUser);

  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(user?.description);

  const dispatch = useAppDispatch();
  const handleChanges = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
  };
  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSubmit = async () => {
    setIsEditing(false);
    // Здесь передаем и contactType
  };

  return (
    <div>
      <div className={styles.inputGroup}>
        <button
          type="button"
          onClick={isEditing ? handleSubmit : handleEdit}
          className={styles.buttonEdit}>
          {isEditing ? (
            <FaCheck className={styles.iconOk} />
          ) : (
            <LuPencil className={styles.iconEdit} />
          )}
        </button>
        <p className={styles.titleInput}>Опис</p>
      </div>
      <textarea
        placeholder={""}
        value={value}
        onChange={handleChanges}
        disabled={!isEditing}
        className={`${styles.input} ${isEditing && styles.active}`}
      />
    </div>
  );
};

export default UserUpdateDescription;
