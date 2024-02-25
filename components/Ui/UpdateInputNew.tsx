import React, { useState, ChangeEvent } from "react";
import { FaCheck } from "react-icons/fa";
import styles from "@/styles/components/Ui/UpdateInputNew.module.css";
import { Comfortaa } from "next/font/google";
const inter = Comfortaa({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});
interface InputUiProps {
  contactType?: string;
  initialValue?: string;
  onChange?: (value: string) => void;
  onSubmit?: (value: string, contactType?: string) => void;
  placeholder?: string;
}

const UpdateInputNew: React.FC<InputUiProps> = ({
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
    setIsEditing(true);
  };

  const handleSubmit = () => {
    setIsEditing(false);
    if (onSubmit) {
      onSubmit(value, contactType);
    }
  };

  return (
    <div className={`${styles.inputGroup} ${inter.className}`}>
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={handleChanges}
        className={`${styles.input} ${styles.inputGroup}`}
      />
      {isEditing && value.trim() !== "" && (
        <button
          type="button"
          onClick={handleSubmit}
          className={styles.buttonSubmit}>
          <FaCheck className={styles.iconOk} />
        </button>
      )}
    </div>
  );
};

export default UpdateInputNew;
