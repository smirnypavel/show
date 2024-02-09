import React, { useEffect, useState } from "react";
import axios from "axios";
import { IUserAuth } from "@/types/IAuth";
import Image from "next/image";
import styles from "@/styles/Home/HomeLeftBest/TopArtistRegesign.module.css";
import NoPhoto_PNG from "@/public/user/NoPhoto_PNG.png";
import Link from "next/link";
import { IoIosArrowForward } from "react-icons/io";

const TopArtistsRedesign: React.FC = () => {
  const [artists, setArtists] = useState<IUserAuth[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/users/");
        const fetchedArtists: IUserAuth[] = response.data.data;
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
      <p className={styles.title}>Наш Топ</p>
      <p className={styles.titleText}>Раді презентувати топ наших виконавців</p>
      <ul className={styles.imageList}>
        {artists.map((artist) => (
          <li
            key={artist._id}
            className={styles.artistItem}>
            <div className={styles.imageItem}>
              {artist.master_photo.url ? (
                <Image
                  src={artist.master_photo.url}
                  alt={"user photo"}
                  fill
                  className={styles.image}
                  sizes="(min-width: 808px) 50vw, 100vw"
                />
              ) : (
                <Image
                  src={NoPhoto_PNG}
                  alt={"default user photo"}
                  fill
                  className={styles.image}
                  sizes="(min-width: 808px) 50vw, 100vw"
                />
              )}
            </div>
            <div className={styles.artistPhotoList}>
              {artist.photo.slice(0, 2).map(
                (
                  photo // Отображаем только первые две фотографии
                ) => (
                  <div
                    key={photo.publicId}
                    className={styles.artistPhotoItem}>
                    <Image
                      src={photo.url}
                      alt={"user photo"}
                      fill
                      className={styles.image}
                      sizes="(min-width: 808px) 50vw, 100vw"
                    />
                  </div>
                )
              )}
              <Link
                href={`/artist/${artist._id}`}
                className={styles.profileLink}>
                Більше <IoIosArrowForward />
              </Link>
            </div>
            {artist.category.length === 0 ? (
              <div className={styles.categoryArtist}>Категорії не обрані</div>
            ) : (
              artist.category.slice(0, 1).map((cat) =>
                cat.subcategories.slice(0, 1).map((subCat) => (
                  <div
                    className={styles.categoryItem}
                    key={subCat.id}>
                    {subCat.name}
                  </div>
                ))
              )
            )}
            <div>
              <p className={styles.artistTitle}>{artist.title}</p>
            </div>
            <div className={styles.avatarContainer}>
              <div className={styles.avatarItem}>
                {artist.avatar ? (
                  <Image
                    src={artist.avatar.url}
                    alt={"user photo"}
                    fill
                    className={styles.image}
                    sizes="(min-width: 808px) 50vw, 100vw"
                  />
                ) : (
                  <Image
                    src={NoPhoto_PNG}
                    alt={"default user photo"}
                    fill
                    className={styles.image}
                    sizes="(min-width: 808px) 50vw, 100vw"
                  />
                )}
              </div>
              <p className={styles.artistName}>{artist.firstName}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TopArtistsRedesign;
