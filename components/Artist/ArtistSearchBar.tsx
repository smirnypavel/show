import React from "react";
import SearchBarCategorySelect from "./SearchBarCategorySelect";
import styles from "@/styles/components/Artist/ArtistSearchBar.module.css";

const ArtistSearchBar = () => {
  return (
    <div className={styles.container}>
      <input
        type="text"
        placeholder="пошук артистів"
      />
      <button type="button">пошук</button>
      <SearchBarCategorySelect />
    </div>
  );
};

export default ArtistSearchBar;
