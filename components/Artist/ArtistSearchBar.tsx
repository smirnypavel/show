import React, { useState } from "react";
import SearchBarCategorySelect from "./SearchBarCategorySelect";
import styles from "@/styles/components/Artist/ArtistSearchBar.module.css";
import { BsSearch, BsX } from "react-icons/bs";
import ChooseLocationArtist from "./ChooseLocationArtist";
import { useRouter } from "next/router";
import SearchCityArtistList from "../Layout/Header/ChooseLocationNew";
import { Comfortaa } from "next/font/google";
const comfortaa = Comfortaa({ weight: ["400"], subsets: ["latin"] });

const ArtistSearchBar = () => {
  const [req, setSearchTerm] = useState("");
  const router = useRouter();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    router.push({
      pathname: "/artists",
      query: {
        ...router.query,
        req,
      },
    });
  };

  const handleClearClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setSearchTerm(""); // Очищаем ввод

    router.push({
      pathname: "/artists",
      query: {
        loc: "",
        cat: "",
        subcat: "",
        req: "",
        searchTerm: "",
      },
    });
  };

  const clearButton = req ? (
    <button
      type="button"
      onClick={handleClearClick}
      className={styles.buttonClear}>
      <BsX className={styles.buttonIconClear} />
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
            value={req}
            onChange={handleInputChange}
            className={`${styles.inputSearch} ${comfortaa.className}`}
          />
          {/* <ChooseLocationArtist /> */}
          <SearchCityArtistList />{" "}
          <button
            className={styles.searchButton}
            type="button"
            onClick={handleSearchClick}>
            <BsSearch className={styles.buttonIcon} />
          </button>
        </div>
      </div>
      <SearchBarCategorySelect />
    </div>
  );
};

export default ArtistSearchBar;
