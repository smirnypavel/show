import React, { useEffect, useState } from "react";
import styles from "@/styles/Artist/Artist.module.css";
import ArtistSearchBar from "@/components/Artist/ArtistSearchBar";
import { GetServerSideProps } from "next/types";
import axios from "axios";
import { IUserAuth } from "@/types/IAuth";
import toast from "react-hot-toast";
import ArtistList from "@/components/Artist/ArtistList";
import MetaTags from "@/components/Meta/MetaTags";
import Pagination from "@/components/Artist/Pagination";

export interface ItemsPageProps {
  artists: IUserAuth[];
  totalPages: number;
}

const Artists: React.FC<ItemsPageProps> = ({ artists, totalPages }) => {
  const [filteredArtists, setFilteredArtists] = useState<IUserAuth[]>(artists);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedCity, setSelectedCity] = useState<string>("");
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>("");
  const [selectedSubcategoryId, setSelectedSubcategoryId] =
    useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPagesState, setTotalPages] = useState<number>(totalPages);
  console.log(totalPagesState);

  const handleSearch = async (page: number = 1) => {
    try {
      let url = `/users?page=${page}`;
      const queryParams = [];

      if (selectedCity) {
        queryParams.push(`loc=${selectedCity}`);
      }
      if (selectedCategoryId) {
        queryParams.push(`cat=${selectedCategoryId}`);
      }
      if (selectedSubcategoryId) {
        queryParams.push(`subcat=${selectedSubcategoryId}`);
      }
      if (searchTerm.trim() !== "") {
        queryParams.push(`req=${searchTerm}`);
      }

      url += queryParams.length > 0 ? `&${queryParams.join("&")}` : "";

      const response = await axios.get(url);
      const { data, totalPages } = response.data;

      setFilteredArtists(data);
      setTotalPages(totalPages);
    } catch (error) {
      toast.error(`Nothing found for your request ${searchTerm}`);
      setFilteredArtists([]);
      setTotalPages(1);
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    setFilteredArtists(artists);
    const { search } = window.location;
    const params = new URLSearchParams(search);

    const cityParam = params.get("loc");
    const categoryParam = params.get("cat");
    const subcategoryParam = params.get("subcat");
    const reqParam = params.get("req");

    if (cityParam) setSelectedCity(cityParam);
    if (categoryParam) setSelectedCategoryId(categoryParam);
    if (subcategoryParam) setSelectedSubcategoryId(subcategoryParam);
    if (reqParam) setSearchTerm(reqParam);
  }, [artists]);

  useEffect(() => {
    handleSearch(currentPage);
  }, [
    searchTerm,
    selectedCity,
    selectedCategoryId,
    selectedSubcategoryId,
    currentPage,
  ]);

  return (
    <div className={styles.container}>
      <MetaTags
        title="Wechirka | Пошук"
        description="Пошук артистів"
        keywords=""
      />
      <ArtistSearchBar
        onSearch={(searchTerm: string) => {
          setSearchTerm(searchTerm);
        }}
        onCategoryChange={(categoryId: string) => {
          setSelectedCategoryId(categoryId);
        }}
        onSubcategoryChange={(subcategoryId: string) => {
          setSelectedSubcategoryId(subcategoryId);
        }}
        onSelectedCity={(city: string) => {
          setSelectedCity(city);
        }}
      />

      <div>
        <ArtistList artists={filteredArtists} />
      </div>
      <div className={styles.pagination}>
        <Pagination
          currentPage={currentPage}
          onPageChange={handlePageChange}
          totalPages={totalPagesState}
        />
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<ItemsPageProps> = async ({
  query,
}) => {
  try {
    const page = query.page || 1;
    const response = await axios.get(`/users?page=${page}`);
    const artists: IUserAuth[] = response.data.data;
    const totalPages: number = response.data.totalPages;

    return {
      props: {
        artists,
        totalPages,
      },
    };
  } catch (error) {
    console.log("Error:", error);
    return {
      props: {
        artists: [],
        totalPages: 1,
      },
      revalidate: 10,
    };
  }
};

export default Artists;
