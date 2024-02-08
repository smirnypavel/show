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
      {/* <Head>
        <title key="title">{artist.title}</title>
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
      </Head> */}
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
        openGraphData: [
          {
            property: "og:image",
            content:
              "https://glievsbwngosqvrxtupy.supabase.co/storage/v1/object/public/event-banners/Jul%208%20Darkest%20Hour%20LONG.jpeg?t=2022-06-28T21%3A47%3A43.910Z",
            key: "ogimage",
          },
          {
            property: "og:image:width",
            content: "400",
            key: "ogimagewidth",
          },
          {
            property: "og:image:height",
            content: "300",
            key: "ogimageheight",
          },
          {
            property: "og:url",
            content: `http://foobar.com/events`,
            key: "ogurl",
          },
          {
            property: "og:image:secure_url",
            content:
              "https://glievsbwngosqvrxtupy.supabase.co/storage/v1/object/public/event-banners/Jul%208%20Darkest%20Hour%20LONG.jpeg?t=2022-06-28T21%3A47%3A43.910Z",
            key: "ogimagesecureurl",
          },
          {
            property: "og:title",
            content: "Hey hey",
            key: "ogtitle",
          },
          {
            property: "og:description",
            content: "Ima description",
            key: "ogdesc",
          },
          {
            property: "og:type",
            content: "website",
            key: "website",
          },
        ],
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
