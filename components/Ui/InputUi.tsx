import React, { useState, ChangeEvent } from "react";
import { LuPencil } from "react-icons/lu";
import { FaCheck } from "react-icons/fa";
import styles from "@/styles/components/Ui/InputUi.module.css";

interface InputUiProps {
  initialValue?: string;
  onChange?: (value: string) => void;
  onSubmit?: (value: string) => void;
  placeholder?: string; // Добавлен prop для placeholder
}

const InputUi: React.FC<InputUiProps> = ({
  initialValue = "",
  onChange,
  onSubmit,
  placeholder = "", // Используем переданный placeholder или пустую строку по умолчанию
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
      onSubmit(value); // Передача значения value
    }
  };

  return (
    <div className={styles.inputGroup}>
      <input
        type="text"
        placeholder={placeholder} // Используем placeholder из prop
        value={value}
        onChange={handleChanges}
        disabled={!isEditing}
        className={styles.input}
      />
      <button
        onClick={isEditing ? handleSubmit : handleEdit}
        className={styles.buttonEdit}>
        {isEditing ? (
          <FaCheck className={styles.iconOk} />
        ) : (
          <LuPencil className={styles.iconEdit} />
        )}
      </button>
    </div>
  );
};

export default InputUi;
