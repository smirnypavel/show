import Link from "next/link";
import { IUserAuth } from "@/types/IAuth";
import Image from "next/image";
import styles from "@/styles/components/Artist/ArtistList.module.css";

export interface ItemListProps {
  artists: IUserAuth[];
}

const ArtistList: React.FC<ItemListProps> = ({ artists }) => {
  if (!artists || artists.length === 0) {
    return <p>No artists found</p>; // Заглушка или сообщение об отсутствии данных
  }

  return (
    <div className={styles.container}>
      <p>ArtistList</p>
      <ul className={styles.artistList}>
        {artists &&
          artists.map((artist) => (
            <li
              key={artist._id}
              className={styles.artistItem}>
              <Link href={`/artists/${artist._id}`}>
                <Image
                  src={artist.master_photo}
                  alt={"user photo"}
                  width={200}
                  height={200}
                />
                <div>
                  <p> Назва: {artist.title}</p>
                  <p>Імя: {artist.firstName}</p>
                </div>
                <div>
                  <p> Опис: {artist.description}</p>
                  <p>Ціна: {artist.price}</p>
                </div>
              </Link>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default ArtistList;
