import ArtistList from "@/components/Artist/ArtistList";
import React, { useState } from "react";
import styles from "@/styles/Artist/Artist.module.css";
import ArtistSearchBar from "@/components/Artist/ArtistSearchBar";
import { GetServerSideProps } from "next/types";
import axios from "axios";
import { IUserAuth } from "@/types/IAuth";
import toast from "react-hot-toast";
export interface ItemsPageProps {
  artists: IUserAuth[];
}
const Artists: React.FC<ItemsPageProps> = ({ artists }) => {
  const [filteredArtists, setFilteredArtists] = useState<IUserAuth[]>(artists);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>("");
  const [selectedSubcategoryId, setSelectedSubcategoryId] =
    useState<string>("");

  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategoryId(categoryId);
    handleSearch(categoryId, selectedSubcategoryId);
  };

  const handleSubcategoryChange = (subcategoryId: string) => {
    setSelectedSubcategoryId(subcategoryId);
    handleSearch(subcategoryId);
  };

  const handleSearch = async (
    categoryId: string = "",
    subcategoryId: string = ""
  ) => {
    try {
      let url = "/users";

      if (searchTerm.trim() !== "") {
        url += `/?req=${searchTerm}`;
      } else if (categoryId) {
        url += `/?req=${categoryId}`;
      } else if (subcategoryId) {
        url += `/?req=${subcategoryId}`;
      }

      const response = await axios.get(url);
      setFilteredArtists(response.data);
    } catch (error) {
      toast.error(`Nothing found for your request ${searchTerm}`);
      setFilteredArtists([]); // В случае ошибки, установите пустой массив
    }
  };

  return (
    <div className={styles.container}>
      <ArtistSearchBar
        onSearch={(searchTerm: string) => {
          setSearchTerm(searchTerm);
          handleSearch(selectedCategoryId, selectedSubcategoryId);
        }}
        onCategoryChange={handleCategoryChange}
        onSubcategoryChange={handleSubcategoryChange}
      />
      <ArtistList artists={filteredArtists} />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<
  ItemsPageProps
> = async () => {
  try {
    // Запрос на все элементы
    const response = await axios.get(`/users/`);
    const artists: IUserAuth[] = response.data;
    return {
      props: {
        artists,
      },
    };
  } catch (error) {
    console.log("Ошибка:", error);
    return {
      props: {
        artists: [],
      },
      revalidate: 10,
    };
  }
};
export default Artists;
