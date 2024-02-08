import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head"; // Импорт компонента Head
import styles from "@/styles/Artist/Artist.module.css";
import ArtistSearchBar from "@/components/Artist/ArtistSearchBar";
import axios from "axios";
import { IUserAuth } from "@/types/IAuth";
import toast from "react-hot-toast";
import Pagination from "@/components/Artist/Pagination";
import { GetServerSideProps } from "next/types";
import Image from "next/image";
import Link from "next/link";
import styles2 from "@/styles/components/Artist/ArtistList.module.css";
import { GrLocation } from "react-icons/gr";
import NoPhoto_PNG from "@/public/user/NoPhoto_PNG.png";
import UserNoPhoto from "@/public/user/UserNoPhoto.jpg";
import { IoIosArrowForward } from "react-icons/io";
import MobileSort from "@/components/Artist/Mobile/MobileSort";
import MobileCat from "@/components/Artist/Mobile/MobileCat";
import ScrollToTopButton from "@/components/helpers/ScrollToTopButton";

import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Wechirka | Пошук",
  description: "Пошук артистів",
  openGraph: {
    // title: 'Blog',
    title: "Wechirka | Пошук",
    description:
      "Тут Ви зможете знайти будь-якого артиста за допомогою категорій та фільтрів",
    images: [
      {
        url: "https://res.cloudinary.com/dciy3u6un/image/upload/v1701947849/service/paanrsds5krezvpreog0.webp",
      },
    ],
    url: "https://www.wechirka.com/artists",
    // fb:app_id: "302462449359607",
    locale: "uk_UA",
    siteName: "Wechirka",
    type: "website",
  },
};
interface ArtistsProps {
  artists: IUserAuth[];
  totalPages: number;
}

const Artists: React.FC<ArtistsProps> = ({ artists, totalPages }) => {
  const [filteredArtists, setFilteredArtists] = useState<IUserAuth[]>(artists);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const router = useRouter();

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    router.push(`/artists?page=${page}`);
  };

  useEffect(() => {
    setFilteredArtists(artists);
    const { search } = window.location;
    const params = new URLSearchParams(search);

    const pageFromQuery = params.get("page")
      ? parseInt(params.get("page") as string, 10)
      : 1;
    setCurrentPage(pageFromQuery);
  }, [artists]);

  const handleGoBack = () => {
    router.back();
  };
  const handleCancel = () => {
    router.push({
      pathname: "/artists",
    });
  };

  return (
    <>
      {/* <Head>
        <title>{metadata.title}</title>
        <meta
          name="description"
          content={metadata.description}
        />
        <meta
          property="og:title"
          content={metadata.openGraph?.title}
        />
        <meta
          property="og:description"
          content={metadata.ogDescription}
        />
        <meta
          property="og:image"
          content={metadata.ogImage}
        />
        <meta
          property="og:url"
          content={metadata.ogUrl}
        />
        <meta
          property="fb:app_id"
          content={metadata.fbApp_id}
        />
        <meta
          property="og:locale"
          content={metadata.ogLocale}
        />
        <meta
          property="og:site_name"
          content={metadata.ogSiteName}
        />
        <meta
          property="og:type"
          content={metadata.ogType}
        />
      </Head> */}

      <div className={styles.container}>
        <div className={styles.mobileBar}>
          <MobileCat />
          <MobileSort />
        </div>
        <ArtistSearchBar
          onSearch={(req: string) => {
            router.push({
              pathname: "/artists",
              query: {
                ...router.query,
                req,
              },
            });
          }}
          onCategoryChange={(cat: string) => {
            router.push({
              pathname: "/artists",
              query: {
                ...router.query,
                cat,
              },
            });
          }}
          onSubcategoryChange={(subcat: string) => {
            router.push({
              pathname: "/artists",
              query: {
                ...router.query,
                subcat,
              },
            });
          }}
          onSelectedCity={(loc: string) => {
            router.push({
              pathname: "/artists",
              query: {
                ...router.query,
                loc,
              },
            });
          }}
        />

        <div className={styles.content}>
          <div className={styles2.container}>
            {filteredArtists && filteredArtists.length > 0 ? (
              <ul className={styles2.artistList}>
                <div className={styles2.buttonBackContainer}>
                  <Link href="/">
                    <div> Головна</div>
                  </Link>
                  <IoIosArrowForward />
                  <button className={styles2.buttonBackText}>Артисти</button>
                </div>
                {filteredArtists &&
                  filteredArtists.map((artist) => (
                    <li
                      key={artist._id}
                      className={styles2.artistItem}>
                      <div className={styles2.cardContainer}>
                        <Link
                          href={`/artists/${artist._id}?page=${currentPage}`}>
                          <div className={styles2.imageContainer}>
                            {artist.master_photo.url ? (
                              <Image
                                src={artist.master_photo.url}
                                alt={"user photo"}
                                fill
                                className={styles2.image}
                                sizes="(min-width: 808px) 50vw, 100vw"
                              />
                            ) : (
                              <Image
                                src={NoPhoto_PNG}
                                alt={"default user photo"}
                                fill
                                className={styles2.image}
                                sizes="(min-width: 768px) 50vw, 100vw"
                              />
                            )}
                          </div>
                        </Link>
                        <div className={styles2.cardInfo}>
                          <div className={styles2.cardTopContainer}>
                            <p className={styles2.locationContainer}>
                              <GrLocation className={styles2.geoIcon} />
                              {artist.location
                                ? artist.location.split(",")[0]
                                : "Місто не обрано"}
                            </p>
                            <p>
                              ₴{" "}
                              {artist.price ? artist.price : "Ціна не вказана"}
                            </p>
                            <div className={styles2.artistProfile}>
                              <div className={styles2.avatarContainer}>
                                {artist.avatar.url ? (
                                  <Image
                                    src={artist.avatar.url}
                                    alt={"user avatar"}
                                    fill
                                    className={styles2.avatar}
                                    sizes="(min-width: 808px) 50vw, 100vw"
                                  />
                                ) : (
                                  <Image
                                    src={UserNoPhoto}
                                    alt={"default user avatar"}
                                    fill
                                    className={styles2.avatar}
                                    sizes="(min-width: 808px) 50vw, 100vw"
                                  />
                                )}
                              </div>
                              <p> {artist.firstName}</p>
                            </div>
                          </div>
                          <div className={styles2.categoryContainer}>
                            {artist.category.length === 0 ? (
                              <div className={styles2.categoryArtist}>
                                Категорії не обрані
                              </div>
                            ) : (
                              artist.category.map((cat) =>
                                cat.subcategories.map((subCat) => (
                                  <div
                                    className={styles2.categoryArtist}
                                    key={subCat.id}>
                                    {subCat.name}
                                  </div>
                                ))
                              )
                            )}
                          </div>
                          <div className={styles2.descriptionContainer}>
                            <div className={styles2.wrapper}>
                              <p className={styles2.descriptionTitle}>
                                {artist.title}
                              </p>
                              <p className={styles2.descriptionText}>
                                {artist.description
                                  ? artist.description
                                  : "Опис не надано"}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
              </ul>
            ) : (
              <>
                <p>
                  Вибачте але по Вашому запиту ні чого не знайдено. В свою чергу
                  ми працюемо над тим щоб задовольнити Усі Ваші запити
                </p>
                <button onClick={handleCancel}>
                  Скинути пошук та почати з початку
                </button>
              </>
            )}
          </div>
        </div>
        <div className={styles.pagination}>
          {totalPages > 0 && (
            <Pagination
              currentPage={currentPage}
              onPageChange={handlePageChange}
              totalPages={totalPages}
            />
          )}
        </div>
        <ScrollToTopButton />
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps<ArtistsProps> = async ({
  query,
}) => {
  try {
    const page = query.page || 1;
    const {
      loc,
      cat,
      subcat,
      req,
      searchTerm,
      selectedCategoryId,
      selectedSubcategoryId,
      selectedCity,
    } = query;

    let url = `/users?page=${page}`;

    if (loc) {
      url += `&loc=${loc}`;
    }
    if (cat) {
      url += `&cat=${cat}`;
    }
    if (subcat) {
      url += `&subcat=${subcat}`;
    }
    if (req) {
      url += `&req=${req}`;
    }
    if (searchTerm) {
      url += `&searchTerm=${searchTerm}`;
    }
    if (selectedCategoryId) {
      url += `&selectedCategoryId=${selectedCategoryId}`;
    }
    if (selectedSubcategoryId) {
      url += `&selectedSubcategoryId=${selectedSubcategoryId}`;
    }
    if (selectedCity) {
      url += `&selectedCity=${selectedCity}`;
    }

    const response = await axios.get(url);
    const artists: any[] = response.data.data;
    const totalPages: number = response.data.totalPages;

    return {
      props: {
        artists,
        totalPages,
      },
    };
  } catch (error) {
    console.error("Error:", error);
    return {
      props: {
        artists: [],
        totalPages: 1,
      },
      revalidate: 10,
    };
  }
};

export default Artists;
