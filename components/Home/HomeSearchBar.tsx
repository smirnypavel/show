import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import styles from "@/styles/Home/HomeSearch.module.css";
import { BsSearch } from "react-icons/bs";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { googleAuth } from "@/redux/auth/authOperations";
import { isFirstReg } from "@/redux/auth/authSelectors";

const HomeSearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const isReg = useAppSelector(isFirstReg);

  const router = useRouter();
  const dispatch = useAppDispatch();
  const token = router.query.token;

  useEffect(() => {
    const authenticateWithGoogle = async () => {
      try {
        if (typeof token === "string") {
          // Додано перевірку на authenticated
          const data = await dispatch(googleAuth(token));
          if (!data.payload.register) {
            router.push("/profile/first-register");
            setAuthenticated(true);
          }
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
