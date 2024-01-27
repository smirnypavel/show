import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import styles from "@/styles/Artist/Artist.module.css";
import ArtistSearchBar from "@/components/Artist/ArtistSearchBar";
import axios from "axios";
import { IUserAuth } from "@/types/IAuth";
import toast from "react-hot-toast";
// import MetaTags from "@/components/Meta/MetaTags";
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
import Head from "next/head";

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
    router.back(); // Переход назад на предыдущую страницу
  };
  const handleCancel = () => {
    router.push({
      pathname: "/artists",
    });
  };

  return (
    <>
      <Head>
        <title>Wechirka пошук артистів</title>
        <meta
          property="description"
          content="Тут Ви зможете знайти будь-якого артиста за допомогою категорій та фільтрів"
        />
        <meta
          property="og:title"
          content="Wechirka пошук артистів"
        />
        <meta
          property="og:description"
          content="Тут Ви зможете знайти будь-якого артиста за допомогою категорій та фільтрів"
        />
        <meta
          property="og:image"
          content="https://res.cloudinary.com/dciy3u6un/image/upload/v1701947849/service/paanrsds5krezvpreog0.webp"
        />
        <meta
          property="og:url"
          content="https://www.wechirka.com"
        />
        <meta
          property="og:type"
          content="website"
        />
        <meta
          property="fb:app_id"
          content="302462449359607"
        />
        <meta
          property="og:locale"
          content="uk_UA"
        />
        <meta
          property="og:site_name"
          content="Wechirka"
        />
      </Head>
      <div className={styles.container}>
        {/* <MetaTags
        title={"Wechirka пошук артистів"}
        description={
          "Іноваційний підхід до пошуку людей які працють у сфері розваг"
        }
        keywords={""}
      /> */}
        {/* <MetaTags
        title="Wechirka | Пошук"
        description="Пошук артистів"
        keywords=""
        ogTitle={"Wechirka | Пошук"}
        ogDescription={
          "Тут Ви зможете знайти будь-якого артиста за допомогою категорій та фільтрів"
        }
        ogImage={
          "https://res.cloudinary.com/dciy3u6un/image/upload/v1701947849/service/paanrsds5krezvpreog0.webp"
        }
        ogUrl={"https://www.wechirka.com/artists"}
        fbApp_id={"302462449359607"}
        ogLocale={"uk_UA"}
        ogSiteName={"Wechirka"}
        ogType={"website"}
      /> */}
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
            // setSearchTerm(searchTerm);
          }}
          onCategoryChange={(cat: string) => {
            router.push({
              pathname: "/artists",
              query: {
                ...router.query,

                cat,
              },
            });
            // setSelectedCategoryId(categoryId);
          }}
          onSubcategoryChange={(subcat: string) => {
            router.push({
              pathname: "/artists",
              query: {
                ...router.query,

                subcat,
              },
            });
            // setSelectedSubcategoryId(subcategoryId);
          }}
          onSelectedCity={(loc: string) => {
            router.push({
              pathname: "/artists",
              query: {
                ...router.query,

                loc,
              },
            });
            // setSelectedCity(city);
          }}
        />

        <div className={styles.content}>
          <div className={styles2.container}>
            {filteredArtists && filteredArtists.length > 0 ? (
              <ul className={styles2.artistList}>
                <div className={styles2.buttonBackContainer}>
                  <Link
                    href="/"
                    // onClick={handleGoBack}
                    className={styles2.buttonBack}>
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
                              {
                                artist.location
                                  ? artist.location.split(",")[0] // Если есть местоположение, отобразить его
                                  : "Місто не обрано" // Если нет, вывести сообщение
                              }
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
                            {" "}
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
