import React, { useState } from "react";
import { useRouter } from "next/router";
import styles from "@/styles/Home/HomeSearch.module.css";
import { BsSearch } from "react-icons/bs";

const HomeSearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push(`/artists?search=${searchTerm}`);
  };

  return (
    <form
      className={styles.container}
      onSubmit={handleSearchSubmit}>
      <input
        type="text"
        placeholder="Знайти виконавця"
        value={searchTerm}
        onChange={handleInputChange}
        className={styles.inputSearch}
      />
      <button
        type="submit"
        className={styles.searchButton}>
        <BsSearch className={styles.buttonIcon} />
      </button>
    </form>
  );
};

export default HomeSearchBar;
