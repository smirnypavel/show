import React from "react";

interface Option {
  value: string;
  label: string;
}

interface CustomSelectFontSizeProps {
  options: Option[];
  selectedValue: string;
  onSelectChange: (value: string) => void;
  className?: string;
}

const CustomSelectFontSize: React.FC<CustomSelectFontSizeProps> = ({
  options,
  selectedValue,
  onSelectChange,
  className,
}) => {
  const handleOptionClick = (value: string) => {
    onSelectChange(value);
  };

  return (
    <div className={`custom-select ${className}`}>
      <select
        value={selectedValue}
        onChange={(e) => handleOptionClick(e.target.value)}>
        {options.map((option, index) => (
          <option
            key={index}
            value={option.value}>
            {option.label}px
          </option>
        ))}
      </select>
    </div>
  );
};
export default CustomSelectFontSize;
