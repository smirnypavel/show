import axios from "axios";
import { GetStaticPaths, GetStaticProps } from "next";
import { IUserAuth } from "@/types/IAuth";
import { useRouter } from "next/router";
import styles from "@/styles/components/Artist/ArtistPage.module.css";
// import MetaTags from "@/components/Meta/MetaTags";
import ArtistPage from "@/components/Artist/ArtistPage";
import Head from "next/head";

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
    <>
      <Head>
        <title>{artist.title}</title>
        <meta
          property="og:title"
          content={artist.title}
          key="ogtitle"
        />
        <meta
          property="description"
          content={artist.description}
          key="description"
        />
        <meta
          property="og:description"
          content={artist.description}
          key="ogdescription"
        />
        <meta
          property="og:image"
          content={artist.master_photo.url}
          key="ogimage"
        />
        <meta
          property="og:url"
          content={`https://www.wechirka.com/artist/${artist._id}`}
          key="ogurl"
        />
        <meta
          property="og:type"
          content="website"
          key="ogtype"
        />
        <meta
          property="fb:app_id"
          content="302462449359607"
          key="fbappid"
        />
        <meta
          property="og:locale"
          content="uk_UA"
          key="oglocale"
        />
        <meta
          property="og:site_name"
          content="Wechirka"
          key="ogsitename"
        />
      </Head>
      {/* <MetaTags /> */}
      <div className={styles.container}>
        <ArtistPage artist={artist} />
      </div>
    </>
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
    console.error("Помилка при отриманні данних:", error);
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
