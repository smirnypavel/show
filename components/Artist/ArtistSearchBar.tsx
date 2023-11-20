import React, { useState } from "react";
import SearchBarCategorySelect from "./SearchBarCategorySelect";
import styles from "@/styles/components/Artist/ArtistSearchBar.module.css";
import { BsSearch } from "react-icons/bs";

interface ArtistSearchBarProps {
  onSearch: (searchTerm: string) => void;
  onCategoryChange: (categoryId: string) => void;
  onSubcategoryChange: (subcategoryId: string) => void;
}

const ArtistSearchBar: React.FC<ArtistSearchBarProps> = ({
  onSearch,
  onCategoryChange,
  onSubcategoryChange,
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
  };

  return (
    <div>
      <div className={styles.container}>
        <input
          type="text"
          placeholder="пошук артистів"
          value={searchTerm}
          onChange={handleInputChange}
          className={styles.inputSearch}
        />
        <button
          className={styles.searchButton}
          type="button"
          onClick={handleSearchClick}>
          <BsSearch className={styles.buttonIcon} />
        </button>
        <button
          type="button"
          onClick={handleClearClick}>
          очистити
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