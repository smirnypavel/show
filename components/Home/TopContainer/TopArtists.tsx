import React, { useEffect, useState } from "react";
import axios from "axios";
import { IUserAuth } from "@/types/IAuth";
import Image from "next/image";
import styles from "@/styles/Home/HomeLeftBest/TopArtist.module.css";

const TopArtists: React.FC = () => {
  const [artists, setArtists] = useState<IUserAuth[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/users/");
        const fetchedArtists: IUserAuth[] = response.data;
        setArtists(fetchedArtists.slice(0, 3)); // Установка первых трех артистов
      } catch (error) {
        console.error("Ошибка получения данных:", error);
        setArtists([]); // Если произошла ошибка, установить пустой массив
      }
    };

    fetchData(); // Вызов функции для получения данных
  }, []); // Пустой массив зависимостей означает выполнение useEffect только при монтировании компонента

  return (
    <div className={styles.imageContainer}>
      {/* Вывод данных об артистах */}
      <ul className={styles.imageList}>
        {artists.map((artist) => (
          <div
            key={artist._id}
            className={styles.imageItemContainer}>
            <li className={styles.imageItem}>
              <Image
                src={artist.master_photo}
                alt={""}
                fill
                className={styles.image}
                sizes="(min-width: 808px) 50vw, 100vw"
              />
            </li>
            <p className={styles.artistName}>{artist.firstName}</p>
            <p className={styles.artistTitle}>{artist.title}</p>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default TopArtists;
