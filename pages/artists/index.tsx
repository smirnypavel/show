import React from "react";
import Head from "next/head";
import styles from "@/styles/Artist/Artist.module.css";
import ArtistSearchBar from "@/components/Artist/ArtistSearchBar";
import axios from "axios";
import { IUserAuth } from "@/types/IAuth";
import Pagination from "@/components/Artist/Pagination";
import { GetServerSideProps } from "next/types";
import MobileSort from "@/components/Artist/Mobile/MobileSort";
import MobileCat from "@/components/Artist/Mobile/MobileCat";
import MyLoader from "@/components/helpers/Placeholders/SkeletonArtistItem";
import ArtistList from "@/components/Artist/ArtistList";

interface ArtistsProps {
  artists: IUserAuth[];
  totalPages: number;
  loading: boolean;
}

const Artists: React.FC<ArtistsProps> = ({ artists, totalPages, loading }) => {
  return (
    <>
      <Head>
        <title>Wechirka | Пошук</title>
        <meta
          name="description"
          content="Тут Ви зможете знайти будь-якого артиста за допомогою категорій та фільтрів"
        />
      </Head>
      <div className={styles.mobileBar}>
        <MobileCat />
        <MobileSort />
      </div>
      <div className={styles.searhWrapper}>
        <ArtistSearchBar />
      </div>

      <ArtistList artists={artists} />
      <div className={styles.pagination}>
        {totalPages > 0 && <Pagination totalPages={totalPages} />}
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps<ArtistsProps> = async ({
  query,
}) => {
  try {
    const page = query.page || 1;
    const { loc, cat, subcat, req } = query;
    let url = `/users?page=${page}`;

    if (loc) {
      url += `&loc=${loc}`;
    }
    if (cat) {
      url += `&cat=${cat}`;
    }
    if (subcat) {
      url += `&subcat=${subcat}`;
    }
    if (req) {
      url += `&req=${req}`;
    }

    const response = await axios.get(url);
    const artists: any[] = response.data.data;
    const totalPages: number = response.data.totalPages;

    return {
      props: {
        artists,
        totalPages,
        loading: false, // Устанавливаем состояние загрузки в false, когда данные загружены
      },
    };
  } catch (error) {
    console.error("Error:", error);
    return {
      props: {
        artists: [],
        totalPages: 1,
        loading: true, // В случае ошибки, устанавливаем состояние загрузки в true
      },
      revalidate: 10,
    };
  }
};

export default Artists;
