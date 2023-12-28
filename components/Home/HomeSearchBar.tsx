import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import styles from "@/styles/Home/HomeSearch.module.css";
import { BsSearch } from "react-icons/bs";
import { useAppDispatch } from "@/redux/hooks";
import { googleAuth } from "@/redux/auth/authOperations";

const HomeSearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();
  const dispatch = useAppDispatch();
  const token = router.query.token;

  // console.log(token);
  useEffect(() => {
    const authenticateWithGoogle = async () => {
      console.log(token);
      try {
        if (typeof token === "string") {
          await dispatch(googleAuth(token));
        }
      } catch (error) {
        console.error("Ошибка при входе:", error);
      }
    };
    if (token) {
      authenticateWithGoogle();
    }
  }, [token]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push(`/artists?req=${searchTerm}`);
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
