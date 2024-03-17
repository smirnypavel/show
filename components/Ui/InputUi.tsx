import React, { useState, ChangeEvent } from "react";
import { LuPencil } from "react-icons/lu";
import { FaCheck } from "react-icons/fa";
import styles from "@/styles/components/Ui/InputUi.module.css";

interface InputUiProps {
  contactType?: string;
  initialValue?: string;
  onChange?: (value: string) => void;
  onSubmit?: (value: string, contactType?: string) => void;
  placeholder?: string;
}

const InputUi: React.FC<InputUiProps> = ({
  contactType,
  initialValue = "",
  onChange,
  onSubmit,
  placeholder = "",
}) => {
  const [value, setValue] = useState(initialValue);
  const [isEditing, setIsEditing] = useState(false);

  const handleChanges = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    if (onChange) {
      onChange(e.target.value);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSubmit = () => {
    setIsEditing(false);
    if (onSubmit) {
      onSubmit(value, contactType); // Здесь передаем и contactType
    }
  };

  return (
    <div className={styles.inputGroup}>
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={handleChanges}
        disabled={!isEditing}
        className={styles.input}
      />
      <button
        onClick={isEditing ? handleSubmit : handleEdit}
        className={styles.buttonEdit}>
        {isEditing ? (
          <div className={styles.buttonWrapper}>
            <FaCheck className={styles.iconOk} />
            <span className={styles.buttonText}>підтвердити</span>
          </div>
        ) : (
          <LuPencil className={styles.iconEdit} />
        )}
      </button>
    </div>
  );
};

export default InputUi;
