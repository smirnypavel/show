import axios from "axios";
import { GetStaticPaths, GetStaticProps } from "next";
import { IUserAuth } from "@/types/IAuth";
import { useRouter } from "next/router";
import styles from "@/styles/components/Artist/ArtistPage.module.css";
import MetaTags from "@/components/Meta/MetaTags";
import ArtistPage from "@/components/Artist/ArtistPage";

export interface ArtistPageProps {
  artist: IUserAuth;
}

const Artist: React.FC<ArtistPageProps> = ({ artist }) => {
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
        keywords={
          artist.category?.[0]?.subcategories?.[0]?.name ||
          "Значение по умолчанию"
        }
        ogImage={artist.avatar.url}
        ogUrl={`https://www.wechirka.com/artists/${artist._id}`}
        ogTitle={artist.title}
        ogDescription={artist.description}
      />
      <ArtistPage artist={artist} />
    </div>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  // const currentPage = context.page || 1;

  try {
    const response = await axios.get(`/users`);
    const artists: IUserAuth[] = response.data.data;

    const paths = artists.map((artist) => ({
      params: { id: artist._id.toString() },
    }));

    return {
      paths,
      fallback: true,
    };
  } catch (error) {
    console.error("Ошибка при получении данных:", error);
    return {
      paths: [],
      fallback: true,
    };
  }
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

export default Artist;
