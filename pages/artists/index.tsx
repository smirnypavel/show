import { GetServerSideProps } from "next/types";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import toast from "react-hot-toast";
import MetaTags from "@/components/Meta/MetaTags";
import ArtistSearchBar from "@/components/Artist/ArtistSearchBar";
import ArtistList from "@/components/Artist/ArtistList";
import Pagination from "@/components/Artist/Pagination";
import { IUserAuth } from "@/types/IAuth";
import styles from "@/styles/Artist/Artist.module.css";

interface ArtistsProps {
  artists: IUserAuth[];
  totalPages: number;
}

const Artists: React.FC<ArtistsProps> = ({ artists, totalPages }) => {
  const [filteredArtists, setFilteredArtists] = useState<IUserAuth[]>(artists);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedCity, setSelectedCity] = useState<string>("");
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>("");
  const [selectedSubcategoryId, setSelectedSubcategoryId] =
    useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPagesState, setTotalPages] = useState<number>(totalPages);
  const router = useRouter();

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

      // Update the address bar with the search queries
      const searchParams = new URLSearchParams();
      if (selectedCity) {
        searchParams.set("loc", selectedCity);
      }
      if (selectedCategoryId) {
        searchParams.set("cat", selectedCategoryId);
      }
      if (selectedSubcategoryId) {
        searchParams.set("subcat", selectedSubcategoryId);
      }
      if (searchTerm.trim() !== "") {
        searchParams.set("req", searchTerm);
      }
      searchParams.set("page", page.toString());

      router.replace(`${router.pathname}?${searchParams.toString()}`);
    } catch (error) {
      toast.error(`Nothing found for your request ${searchTerm}`);
      setFilteredArtists([]);
      setTotalPages(1);
    }
  };

  const handlePageChange = (page: number): void => {
    setCurrentPage(page);
    router.push(`/artists?page=${page}`);
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

    const pageFromQuery = params.get("page")
      ? parseInt(params.get("page") as string, 10)
      : 1;
    setCurrentPage(pageFromQuery);
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
        onSearch={setSearchTerm}
        onCategoryChange={setSelectedCategoryId}
        onSubcategoryChange={setSelectedSubcategoryId}
        onSelectedCity={setSelectedCity}
      />
      <div>
        <ArtistList
          artists={filteredArtists}
          currentPage={currentPage}
        />
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

export const getServerSideProps: GetServerSideProps<ArtistsProps> = async ({
  query,
}) => {
  try {
    const { page = 1 } = query;
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
