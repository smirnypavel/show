import React, { useState } from "react";
import styles from "@/styles/components/Ui/ColorSelect.module.css";

interface Option {
  value: string;
  color: string;
}

const CustomSelect: React.FC<CustomSelectProps> = ({
  options,
  selectedValue,
  onSelectChange,
  className,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [color, setColor] = useState("");

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (value: string) => {
    setColor(value);
    onSelectChange(value);
    setIsOpen(false); // Close the dropdown after selection
  };

  return (
    <div className={styles.customSelect}>
      <button
        type="button"
        onClick={toggleDropdown}
        style={{ backgroundColor: color }}
        // className={styles.selectedColor}
      >
        {/* <div
         
        /> */}
      </button>
      {isOpen && (
        <ul className={styles.customSelectOptions}>
          {options.map((option) => (
            <li key={option.value}>
              <button
                type="button"
                style={{ backgroundColor: option.color }}
                onClick={() => handleOptionClick(option.value)}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

interface CustomSelectProps {
  options: Option[];
  selectedValue: string;
  onSelectChange: (value: string) => void;
  className?: string;
}

export default CustomSelect;
