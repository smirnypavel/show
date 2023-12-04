import React from "react";
import { getUser } from "@/redux/auth/authSelectors";
import { useSelector } from "react-redux";
import Image from "next/image";
import UserNoPhoto from "@/public/user/UserNoPhoto.jpg";
import Link from "next/link";
import YouTubeEmbed from "@/components/User/YouTubeIFrame";
import styles from "@/styles/components/Profile/UserProfile.module.css";
import { TbPencil } from "react-icons/tb";
import { HiOutlinePhone } from "react-icons/hi";
import { SiMaildotru } from "react-icons/si";
import { IoArrowRedoOutline } from "react-icons/io5";
// import ReactPlayer from "react-player/lazy";

const UserProfile = () => {
  const user = useSelector(getUser);

  return (
    <div className={styles.container}>
      <div className={styles.profileContainer}>
        <div className={styles.avatarContainer}>
          <div className={styles.avatarWrapper}>
            {user.avatar.url ? (
              <Image
                src={user.avatar.url}
                alt={"user photo"}
                fill
                className={styles.avatar}
                sizes="100%"
              />
            ) : (
              <Image
                src={UserNoPhoto}
                alt={"user photo"}
                fill
                className={styles.avatar}
                sizes="100%"
              />
            )}
          </div>
          <div className={styles.updateLinkContainer}>
            <Link
              href={"/profile/update"}
              className={styles.updateLink}>
              <TbPencil className={styles.updateLinkIcon} />
              Налаштування профілю
            </Link>
          </div>
        </div>
        <div className={styles.profileInfoContainer}>
          <p className={styles.username}>{user.firstName}</p>
          <p className={styles.usertitle}>{user.title}</p>
          <div className={styles.userContactsContainer}>
            <p className={styles.userContacts}>
              <HiOutlinePhone className={styles.userContactsIcon} />
              {user.phone}
            </p>
            <p className={styles.userContacts}>
              <SiMaildotru className={styles.userContactsIcon} />
              {user.email}
            </p>
          </div>
          {/* <div className={styles.userContactsContainer}>
            <p className={styles.userContacts}>
              <HiOutlinePhone className={styles.userContactsIcon} />
              {user.telegram}
            </p>
            <p className={styles.userContacts}>
              <SiMaildotru className={styles.userContactsIcon} />
              {user.viber}
            </p>
          </div> */}

          <p className={styles.price}> ₴{user.price}</p>
          <div className="">
            <p className={styles.locationTitle}>Місто</p>
            <p className={styles.location}>{user.location}</p>
          </div>
        </div>
        <div>
          <p className={styles.shareLink}>
            <IoArrowRedoOutline className={styles.shareIcon} />
            Поділитись
          </p>
        </div>
      </div>
      <div>
        <p className={styles.descriptionTitle}>Про себе</p>
        <div className={styles.descriptionWrapper}>{user.description}</div>
      </div>
      <div>
        <p className={styles.descriptionTitle}>Категорії надання послуг</p>
        <div className={styles.categoryContainer}>
          {user.category.map((cat) => (
            <div
              className={styles.categoryArtist}
              key={cat._id}>
              {cat.name}
            </div>
          ))}
        </div>
        <p className={styles.descriptionTitle}>Підкатегорія</p>

        <div className={styles.categoryContainer}>
          {user.category.map((cat) =>
            cat.subcategories.map((subCat) => (
              <div
                className={styles.categoryArtist}
                key={subCat.id}>
                {subCat.name}
              </div>
            ))
          )}
        </div>
        <div className={styles.portfolioContainer}>
          <p className={styles.portfolioTitle}>Портфоліо</p>

          <ul className={styles.photoListContainer}>
            {user.photo.map((item) => (
              <li
                key={item.publicId}
                className={styles.photoListItem}>
                <Image
                  src={item.url}
                  alt={"user photo"}
                  fill
                  sizes="(min-width: 808px) 50vw, 100vw"
                  className={styles.photo}
                />
              </li>
            ))}
          </ul>
        </div>
        <div className={styles.videoContainer}>
          <ul className={styles.videoListContainer}>
            {user.video.map((item) => (
              <li
                key={item.publicId}
                className={styles.videoListItem}>
                <YouTubeEmbed url={item.url} />
                {/* <ReactPlayer
                  className="react-player"
                  url={item.url}
                  width="100%"
                  height="100%"
                  controls={false}
                /> */}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
