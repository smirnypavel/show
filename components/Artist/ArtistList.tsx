import { IUserAuth } from "@/types/IAuth";
import Image from "next/image";
import styles from "@/styles/components/Artist/ArtistList.module.css";
import axios from "axios";
import React, { useEffect, useState } from "react";
export interface ItemListProps {
  artists: IUserAuth[];
}
const ArtistList: React.FC<ItemListProps> = ({ artists }) => {
  if (!artists || artists.length === 0) {
    return <p>No artists found</p>; // Заглушка или сообщение об отсутствии данных
  }
  // const [artistList, setArtistList] = useState<IUserAuth[]>([]);

  // useEffect(() => {
  //   const fetchArtist = async () => {
  //     try {
  //       const response = await axios.get("/users/find");
  //       setArtistList(response.data);
  //     } catch (error) {
  //       console.error("Ошибка при загрузке всех артистов:", error);
  //     }
  //   };

  //   fetchArtist();
  //   console.log(artistList);
  // }, []);

  return (
    <div className={styles.container}>
      <p>ArtistList</p>
      <ul className={styles.artistList}>
        {artists &&
          artists.map((artist) => (
            <li
              key={artist._id}
              className={styles.artistItem}>
              <Image
                src={artist.master_photo}
                alt={"user photo"}
                width={200}
                height={200}
              />
              <div>
                {" "}
                <p> Назва: {artist.title}</p>
                <p>Імя: {artist.firstName}</p>
              </div>
              <div>
                {" "}
                <p> Опис: {artist.description}</p>
                <p>Ціна: {artist.price}</p>
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default ArtistList;
