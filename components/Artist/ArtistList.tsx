import { IUserAuth } from "@/types/IAuth";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import styles from "@/styles/components/Artist/ArtistList.module.css";
import { GrLocation } from "react-icons/gr";
import { TbCurrencyHryvnia } from "react-icons/tb";
import NoPhoto_PNG from "@/public/user/NoPhoto_PNG.png";
import UserNoPhoto from "@/public/user/UserNoPhoto.jpg";
import { IoIosArrowForward } from "react-icons/io";
import ScrollToTopButton from "../helpers/ScrollToTopButton";
import { useState } from "react";

export interface ItemListProps {
  artists: IUserAuth[];
}

const ArtistList: React.FC<ItemListProps> = ({ artists }) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const router = useRouter();
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    router.push(`/artists?page=${page}`);
  };
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
      <div className={styles.container}>
        <div className={styles.container}>
          {artists && artists.length > 0 ? (
            <ul className={styles.imageList}>
              <div className={styles.buttonBackContainer}>
                <Link href="/">
                  <div> Головна</div>
                </Link>
                <IoIosArrowForward />
                <button className={styles.buttonBackText}>Артисти</button>
              </div>

              {artists &&
                artists.map((artist) => (
                  <div
                    key={artist._id}
                    className={styles.card}>
                    {" "}
                    <div className={styles.circleLeft}></div>
                    <div className={styles.circleRight}></div>
                    <li className={styles.artistItem}>
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
                        <div className={styles.titleMobil}>{artist.title}</div>
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
                          href={`/artists/${artist._id}`}
                          className={styles.profileLink}>
                          Більше <IoIosArrowForward />
                        </Link>
                      </div>
                      <div className={styles.cardInfo}>
                        <div className={styles.cardInfoTop}>
                          <div className={styles.tileCategoryContainer}>
                            <div className={styles.artistTitleContainer}>
                              <p className={styles.artistTitle}>
                                {artist.title}
                              </p>
                            </div>
                            {artist.category.length === 0 ? (
                              <div className={styles.categoryArtist}>
                                Категорії не обрані
                              </div>
                            ) : (
                              artist.category.slice(0, 1).map((cat) =>
                                cat.subcategories.slice(0, 3).map((subCat) => (
                                  <div
                                    className={styles.categoryItem}
                                    key={subCat.id}>
                                    {subCat.name}
                                  </div>
                                ))
                              )
                            )}
                          </div>
                          <div className={styles.cardInfoTopRight}>
                            <div className={styles.avatarContainer}>
                              <p className={styles.artistName}>
                                {artist.firstName}
                              </p>
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
                            </div>
                            <p className={styles.paragraph}>
                              {artist.location.split(",")[0]}{" "}
                              <GrLocation className={styles.icon} />
                            </p>
                            <p className={styles.paragraph}>
                              {artist.price}{" "}
                              <TbCurrencyHryvnia className={styles.icon} />
                            </p>
                          </div>
                        </div>
                        <div className={styles.description}>
                          {" "}
                          {artist.description}
                        </div>
                      </div>
                    </li>
                  </div>
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
        <ScrollToTopButton />
      </div>
    </>
  );
};

export default ArtistList;
