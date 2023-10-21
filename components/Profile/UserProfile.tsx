import React from "react";
import { getUser } from "@/redux/auth/authSelectors";
import { useSelector } from "react-redux";
import Image from "next/image";
// import UserNoPhoto from "@/public/user/UserNoPhoto.jpg";
import Link from "next/link";
import YouTubeEmbed from "@/components/User/YouTubeIFrame";
import styles from "@/styles/components/Profile/UserProfile.module.css";

const UserProfile = () => {
  const user = useSelector(getUser);

  return (
    <div className={styles.container}>
      <p>Profile</p>
      <div className={styles.profileContainer}>
        <div>
          <Image
            src={user.master_photo}
            alt={"user photo"}
            width={200}
            height={200}
          />
          <ul className={styles.photoListContainer}>
            {user.photo.map((item) => (
              <li key={item.publicId}>
                <Image
                  src={item.url}
                  alt={"user photo"}
                  width={50}
                  height={50}
                />
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p>{user.title}</p>
          <p>{user.firstName}</p>
          <p>{user.location}</p>
          <p>{user.description}</p>
          <p> Price:{user.price}</p>
          <p>Email:{user.email}</p>
          <p>Whatsapp:{user.whatsapp}</p>
          <p>Phone:{user.phone}</p>
          <p>Telegram:{user.telegram}</p>
          <p>Viber:{user.viber}</p>
        </div>
      </div>
      <p>Відео плейліст</p>
      <ul className={styles.videoListContainer}>
        {user.video.map((item, index) => (
          <li key={index}>
            <YouTubeEmbed url={item} />
          </li>
        ))}
      </ul>
      {/* */}
      <Link href={"/profile/update"}>Настройки профиля</Link>
    </div>
  );
};

export default UserProfile;
