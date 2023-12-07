// import ArtistList from "@/components/Artist/ArtistList";
// import { useRouter } from "next/router";
// import React, { useEffect, useState } from "react";
// import styles from "@/styles/Artist/Artist.module.css";
// import ArtistSearchBar from "@/components/Artist/ArtistSearchBar";
// import { GetServerSideProps } from "next/types";
// import axios from "axios";
// import { IUserAuth } from "@/types/IAuth";
// import toast from "react-hot-toast";
// export interface ItemsPageProps {
//   artists: IUserAuth[];
// }
// const Artists: React.FC<ItemsPageProps> = ({ artists }) => {
//   const [filteredArtists, setFilteredArtists] = useState<IUserAuth[]>(artists);
//   const [searchTerm, setSearchTerm] = useState<string>("");
//   const [selectedCity, setSelectedCity] = useState<string>("");
//   const [selectedCategoryId, setSelectedCategoryId] = useState<string>("");
//   const [selectedSubcategoryId, setSelectedSubcategoryId] =
//     useState<string>("");
//   const router = useRouter();
//   const handleCategoryChange = (categoryId: string) => {
//     setSelectedCategoryId(categoryId);
//     handleSearch(categoryId, selectedSubcategoryId);
//   };

//   const handleSubcategoryChange = (subcategoryId: string) => {
//     setSelectedSubcategoryId(subcategoryId);
//     handleSearch(subcategoryId);
//   };
//   const handleCityChange = (city: string) => {
//     setSelectedCity(city);
//     handleSearch(city, selectedSubcategoryId, selectedCategoryId);
//   };

//   const handleSearch = async (
//     categoryId: string = "",
//     subcategoryId: string = "",
//     city: string = ""
//   ) => {
//     try {
//       let url = "/users";

//       if (searchTerm.trim() !== "") {
//         url += `/?req=${searchTerm}&loc=${city}`;
//       } else if (categoryId) {
//         url += `/?req=${categoryId}&loc=${city}`;
//       } else if (subcategoryId) {
//         url += `/?req=${subcategoryId}&loc=${city}`;
//       }

//       const response = await axios.get(url);
//       setFilteredArtists(response.data);
//     } catch (error) {
//       toast.error(`Nothing found for your request ${searchTerm}`);
//       setFilteredArtists([]); // В случае ошибки, установите пустой массив
//     }
//   };
//   useEffect(() => {
//     setFilteredArtists(artists); // Установить начальные результаты
//     const { search } = router.query;
//     if (search && typeof search === "string") {
//       setSearchTerm(search);
//     }
//   }, [router.query]);
//   useEffect(() => {
//     handleSearch();
//   }, [searchTerm]); // Добавьте searchTerm в зависимости

//   return (
//     <div className={styles.container}>
//       <ArtistSearchBar
//         onSearch={(searchTerm: string) => {
//           setSearchTerm(searchTerm);
//           handleSearch();
//         }}
//         onCategoryChange={handleCategoryChange}
//         onSubcategoryChange={handleSubcategoryChange}
//         onSelectedCity={handleCityChange}
//       />
//       <div>
//         <ArtistList artists={filteredArtists} />
//       </div>
//     </div>
//   );
// };

// export const getServerSideProps: GetServerSideProps<
//   ItemsPageProps
// > = async () => {
//   try {
//     // Запрос на все элементы
//     const response = await axios.get(`/users/`);
//     const artists: IUserAuth[] = response.data;
//     return {
//       props: {
//         artists,
//       },
//     };
//   } catch (error) {
//     console.log("Ошибка:", error);
//     return {
//       props: {
//         artists: [],
//       },
//       revalidate: 10,
//     };
//   }
// };
// export default Artists;
import React, { useEffect, useState } from "react";
import styles from "@/styles/Artist/Artist.module.css";
import ArtistSearchBar from "@/components/Artist/ArtistSearchBar";
import { GetServerSideProps } from "next/types";
import axios from "axios";
import { IUserAuth } from "@/types/IAuth";
import toast from "react-hot-toast";
import ArtistList from "@/components/Artist/ArtistList";
import MetaTags from "@/components/Meta/MetaTags";

export interface ItemsPageProps {
  artists: IUserAuth[];
}

const Artists: React.FC<ItemsPageProps> = ({ artists }) => {
  const [filteredArtists, setFilteredArtists] = useState<IUserAuth[]>(artists);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedCity, setSelectedCity] = useState<string>("");
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>("");
  const [selectedSubcategoryId, setSelectedSubcategoryId] =
    useState<string>("");

  const handleSearch = async () => {
    try {
      let url = "/users?";
      const queryParams = [];

      if (selectedCity) {
        queryParams.push(`loc=${selectedCity}`);
      }
      if (selectedCategoryId) {
        queryParams.push(`req=${selectedCategoryId}`);
      }
      if (selectedSubcategoryId) {
        queryParams.push(`req=${selectedSubcategoryId}`);
      }
      if (searchTerm.trim() !== "") {
        queryParams.push(`req=${searchTerm}`);
      }

      url += queryParams.join("&");

      const response = await axios.get(url);
      setFilteredArtists(response.data);
    } catch (error) {
      toast.error(`Nothing found for your request ${searchTerm}`);
      setFilteredArtists([]);
    }
  };

  useEffect(() => {
    setFilteredArtists(artists);
    const { search } = window.location;
    const params = new URLSearchParams(search);

    const cityParam = params.get("loc");
    const categoryParam = params.get("req");
    const subcategoryParam = params.get("req");
    const reqParam = params.get("req");

    if (cityParam) setSelectedCity(cityParam);
    if (categoryParam) setSelectedCategoryId(categoryParam);
    if (subcategoryParam) setSelectedSubcategoryId(subcategoryParam);
    if (reqParam) setSearchTerm(reqParam);
  }, [artists]);

  useEffect(() => {
    handleSearch();
  }, [searchTerm, selectedCity, selectedCategoryId, selectedSubcategoryId]);

  return (
    <div className={styles.container}>
      <MetaTags
        title="Wechirka | Пошук"
        description="Пошук артистів"
        keywords="Пошук артистів"
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
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<
  ItemsPageProps
> = async () => {
  try {
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
