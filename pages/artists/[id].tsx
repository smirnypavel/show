import axios from "axios";
import { GetStaticPaths, GetStaticProps } from "next";
import { IUserAuth } from "@/types/IAuth";
import { useRouter } from "next/router";
import styles from "@/styles/components/Artist/ArtistPage.module.css";
import ArtistPage from "@/components/Artist/ArtistPage";
import Head from "next/head";

export interface ArtistPageProps {
  artist: IUserAuth;
}

const Artist: React.FC<ArtistPageProps> = ({ artist }) => {
  const router = useRouter();

  if (router.isFallback) {
    return <p>Loading...</p>;
  }

  if (!artist) {
    return <p>Artist not found</p>;
  }

  return (
    <>
      <Head>
        <title key="title">{artist.title}</title>
        <meta
          property="description"
          content={artist.description}
          key="description"
        />
      </Head>
      <div className={styles.container}>
        <ArtistPage artist={artist} />
      </div>
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
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
    console.error("Error fetching data:", error);
    return {
      paths: [],
      fallback: true,
    };
  }
};

export const getStaticProps: GetStaticProps<ArtistPageProps> = async ({
  params,
}) => {
  const { id } = params || {};

  if (!id) {
    return {
      notFound: true,
    };
  }

  try {
    const response = await axios.get(`/users/find/${id}`);
    const artist: IUserAuth = response.data;

    if (!artist) {
      return {
        notFound: true,
      };
    }

    return {
      props: {
        artist,
      },
      revalidate: 10,
    };
  } catch (error) {
    console.error("Error:", error);
    return {
      notFound: true,
    };
  }
};

export default Artist;
