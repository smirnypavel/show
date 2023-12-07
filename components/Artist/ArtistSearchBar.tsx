import React, { useState } from "react";
import SearchBarCategorySelect from "./SearchBarCategorySelect";
import styles from "@/styles/components/Artist/ArtistSearchBar.module.css";
import { BsSearch, BsX } from "react-icons/bs";
import ChooseLocationArtist from "./ChooseLocationArtist";

interface ArtistSearchBarProps {
  onSearch: (searchTerm: string) => void;
  onCategoryChange: (categoryId: string) => void;
  onSubcategoryChange: (subcategoryId: string) => void;
  onSelectedCity: (location: string) => void;
}

const ArtistSearchBar: React.FC<ArtistSearchBarProps> = ({
  onSearch,
  onCategoryChange,
  onSubcategoryChange,
  onSelectedCity,
}) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    onSearch(searchTerm); // Вызывайте onSearch при клике на кнопку
  };

  const handleClearClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setSearchTerm(""); // Очищаем ввод
    onSearch(""); // Отправляем пустой запрос
    onCategoryChange(""); // Сбрасываем выбранную категорию
    onSubcategoryChange("");
  };
  const handleCitySelect = (city: string) => {
    onSelectedCity(city);
  };
  const clearButton = searchTerm ? ( // Условие для отображения кнопки крестика
    <button
      type="button"
      onClick={handleClearClick}
      className={styles.buttonClear}>
      <BsX className={styles.buttonIconClear} /> {/* Иконка крестика */}
    </button>
  ) : null;
  return (
    <div>
      <div className={styles.container}>
        <div className={styles.inputLocationContainer}>
          {clearButton}
          <input
            type="text"
            placeholder="Знайти виконавця"
            value={searchTerm}
            onChange={handleInputChange}
            className={styles.inputSearch}
          />
          <ChooseLocationArtist onCitySelect={handleCitySelect} />
        </div>
        <button
          className={styles.searchButton}
          type="button"
          onClick={handleSearchClick}>
          <BsSearch className={styles.buttonIcon} />
        </button>
      </div>
      <SearchBarCategorySelect
        onCategoryChange={onCategoryChange}
        onSubcategoryChange={onSubcategoryChange}
      />
    </div>
  );
};

export default ArtistSearchBar;
