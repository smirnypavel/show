import Link from "next/link";
import { useRouter } from "next/router";
import { IUserAuth } from "@/types/IAuth";
import styles from "@/styles/components/Artist/ArtistPage.module.css";
import React from "react";
import ArtistInfoPage from "./ArtistInfoPage";
import ArtistPromo from "./ArtistPromo";

export interface ArtistPageProps {
  artist: IUserAuth;
}

const ArtistPage: React.FC<ArtistPageProps> = ({ artist }) => {
  const router = useRouter();

  const handleGoBack = () => {
    router.back(); // Переход назад на предыдущую страницу
  };

  return (
    <div className={styles.artistContainer}>
      <div>
        <button onClick={handleGoBack}>Назад</button>
      </div>
      <ArtistPromo artist={artist} />
      <ArtistInfoPage artist={artist} />
    </div>
  );
};

export default ArtistPage;
