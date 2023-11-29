import axios from "axios";
import { GetStaticPaths, GetStaticProps } from "next";
import { IUserAuth } from "@/types/IAuth";
import { useRouter } from "next/router";
import styles from "@/styles/components/Artist/ArtistList.module.css";
import Image from "next/image";
import MetaTags from "@/components/Meta/MetaTags";

export interface ArtistPageProps {
  artist: IUserAuth;
}

const ArtistPage: React.FC<ArtistPageProps> = ({ artist }) => {
  const router = useRouter();

  if (router.isFallback) {
    return <p>Loading...</p>; // Показывать загрузку во время генерации страницы на сервере
  }

  if (!artist) {
    return <p>Artist not found</p>; // Показывать сообщение, если артист не найден
  }

  return (
    <div className={styles.container}>
      <MetaTags
        title={artist.title}
        description={artist.description}
        keywords={artist.category[0].subcategories[0].name}
      />
      <p>ArtistPage</p>
      <div className={styles.artistItem}>
        <Image
          src={artist.master_photo.url}
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
      </div>
    </div>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  // Здесь вы должны получить все возможные id артистов с вашего бекенда
  // Например, используя запрос к API или базе данных
  const response = await axios.get("/users");
  const artists: IUserAuth[] = response.data;

  // Создаем массив путей для всех артистов
  const paths = artists.map((artist) => ({
    params: { id: artist._id.toString() }, // Преобразуем id в строку
  }));

  return {
    paths,
    fallback: true, // Если true, Next.js будет генерировать страницу на сервере при первом запросе
  };
};

export const getStaticProps: GetStaticProps<ArtistPageProps> = async ({
  params,
}) => {
  const { id } = params || {}; // делаем params необязательным и присваиваем пустой объект, если params не определен

  if (!id) {
    return {
      notFound: true,
    };
  }

  try {
    // Здесь вы должны получить данные конкретного артиста по его id
    const response = await axios.get(`/users/find/${id}`);
    const artist: IUserAuth = response.data;

    if (!artist) {
      return {
        notFound: true, // Если артист не найден, покажем 404 страницу
      };
    }

    return {
      props: {
        artist,
      },
      revalidate: 10, // Перегенерация страницы каждые 10 секунд
    };
  } catch (error) {
    console.error("Ошибка:", error);
    return {
      notFound: true, // Если возникла ошибка, покажем 404 страницу
    };
  }
};

export default ArtistPage;
