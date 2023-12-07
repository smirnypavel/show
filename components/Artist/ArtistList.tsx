import Link from "next/link";
import { IUserAuth } from "@/types/IAuth";
import Image from "next/image";
import styles from "@/styles/components/Artist/ArtistList.module.css";
import { GrLocation } from "react-icons/gr";
import NoPhoto_PNG from "@/public/user/NoPhoto_PNG.png";
import UserNoPhoto from "@/public/user/UserNoPhoto.jpg";
export interface ItemListProps {
  artists: IUserAuth[];
}

const ArtistList: React.FC<ItemListProps> = ({ artists }) => {
  if (!artists || artists.length === 0) {
    return <p>No artists found</p>; // Заглушка или сообщение об отсутствии данных
  }

  return (
    <div className={styles.container}>
      <ul className={styles.artistList}>
        {artists &&
          artists.map((artist) => (
            <li
              key={artist._id}
              className={styles.artistItem}>
              <div className={styles.cardContainer}>
                {/* <Link href={`/artists/${artist._id}`}> */}
                <div className={styles.imageContainer}>
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
                <div className={styles.cardInfo}>
                  <div className={styles.cardTopContainer}>
                    <p className={styles.locationContainer}>
                      <GrLocation className={styles.geoIcon} />
                      {
                        artist.location
                          ? artist.location // Если есть местоположение, отобразить его
                          : "Місто не обрано" // Если нет, вывести сообщение
                      }
                    </p>
                    <p>₴ {artist.price ? artist.price : "Ціна не вказана"}</p>

                    <div className={styles.artistProfile}>
                      <div className={styles.avatarContainer}>
                        {artist.avatar.url ? (
                          <Image
                            src={artist.avatar.url}
                            alt={"user avatar"}
                            fill
                            className={styles.avatar}
                            sizes="(min-width: 808px) 50vw, 100vw"
                          />
                        ) : (
                          <Image
                            src={UserNoPhoto}
                            alt={"default user avatar"}
                            fill
                            className={styles.avatar}
                            sizes="(min-width: 808px) 50vw, 100vw"
                          />
                        )}
                      </div>
                      <p> {artist.firstName}</p>
                    </div>
                  </div>
                  <div className={styles.categoryContainer}>
                    {artist.category.length === 0 ? (
                      <div className={styles.categoryArtist}>
                        Категорії не обрані
                      </div>
                    ) : (
                      artist.category.map((cat) =>
                        cat.subcategories.map((subCat) => (
                          <div
                            className={styles.categoryArtist}
                            key={subCat.id}>
                            {subCat.name}
                          </div>
                        ))
                      )
                    )}
                  </div>
                  <div className={styles.descriptionContainer}>
                    <p className={styles.descriptionTitle}>{artist.title}</p>
                    <p className={styles.descriptionText}>
                      {artist.description
                        ? artist.description
                        : "Опис не надано"}
                    </p>
                  </div>
                </div>
              </div>
              {/* </Link> */}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default ArtistList;
