import React from "react";
import Image from "next/image";
import styles from "@/styles/Social-Room/Friends.module.css";
const friends = [
  {
    _di: 1,
    firstName: "John",
    avatar: {
      publicId: 1,
      url: "https://res.cloudinary.com/dciy3u6un/image/upload/v1707785351/user-64ff012f1424c2d37e2d0467/Gemini_Generated_Image%282%29-1707785350934.jpeg.jpg",
    },
  },
  {
    _di: 2,
    firstName: "Pavlik",
    avatar: {
      publicId: 2,
      url: "https://res.cloudinary.com/dciy3u6un/image/upload/v1707785361/user-64ff012f1424c2d37e2d0467/Gemini_Generated_Image%281%29-1707785360994.jpeg.jpg",
    },
  },
  {
    _di: 3,
    firstName: "Vova",
    avatar: {
      publicId: 3,
      url: "https://res.cloudinary.com/dciy3u6un/image/upload/v1707785369/user-64ff012f1424c2d37e2d0467/Gemini_Generated_Image-1707785368897.jpeg.jpg",
    },
  },
  {
    _di: 4,
    firstName: "Elvis",
    avatar: {
      publicId: 4,
      url: "https://res.cloudinary.com/dciy3u6un/image/upload/v1707785381/user-64ff012f1424c2d37e2d0467/Bard_Generated_Image-1707785381209.jpeg.jpg",
    },
  },
  {
    _di: 5,
    firstName: "Wechirka",
    avatar: {
      publicId: 5,
      url: "https://res.cloudinary.com/dciy3u6un/image/upload/v1707785453/user-64ff012f1424c2d37e2d0467/Gemini_Generated_Image%283%29-1707785452323.jpeg.jpg",
    },
  },
];

const Friends = () => {
  return (
    <div className={styles.container}>
      {friends.map((friend) => (
        <div
          key={friend._di}
          className={styles.friendItem}>
          <div className={styles.avatarContainer}>
            <Image
              src={friend.avatar.url}
              alt={friend.firstName}
              fill
              className={styles.avatar}
            />
          </div>
          {friend.firstName}
        </div>
      ))}
    </div>
  );
};

export default Friends;
