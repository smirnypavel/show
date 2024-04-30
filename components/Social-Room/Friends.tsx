import React from "react";
import Image from "next/image";
import styles from "@/styles/Social-Room/Friends.module.css";
import { useQuery } from "@apollo/client/react";
import { gql } from "@apollo/client/core";

const GET_USERS = gql`
  query {
    allUsers(
      query: { req: "", loc: "", page: 1, limit: 4, cat: "", subcat: "" }
    ) {
      data {
        firstName
        avatar {
          url
        }
      }
    }
  }
`;

// const friends = [
//   {
//     _di: 1,
//     firstName: "John",
//     avatar: {
//       publicId: 1,
//       url: "https://res.cloudinary.com/dciy3u6un/image/upload/v1709853194/user-65ea49a15e6bbb81c4e175a7/avatar-banerRegister-1709853193894.jpeg.jpg",
//     },
//   },
//   {
//     _di: 2,
//     firstName: "Pavlik",
//     avatar: {
//       publicId: 2,
//       url: "https://res.cloudinary.com/dciy3u6un/image/upload/v1709853734/user-65ea49a15e6bbb81c4e175a7/Gemini_Generated_Image-1709853733312.jpeg.jpg",
//     },
//   },
//   {
//     _di: 3,
//     firstName: "Vova",
//     avatar: {
//       publicId: 3,
//       url: "https://res.cloudinary.com/dciy3u6un/image/upload/v1709853762/user-65ea49a15e6bbb81c4e175a7/image%2823%29-1709853761716.png.png",
//     },
//   },
//   {
//     _di: 4,
//     firstName: "Elvis",
//     avatar: {
//       publicId: 4,
//       url: "https://res.cloudinary.com/dciy3u6un/image/upload/v1709853788/user-65ea49a15e6bbb81c4e175a7/image-5-1709853787638.png.png",
//     },
//   },
//   {
//     _di: 5,
//     firstName: "Wechirka",
//     avatar: {
//       publicId: 5,
//       url: "https://res.cloudinary.com/dciy3u6un/image/upload/v1709853687/user-65ea49a15e6bbb81c4e175a7/Gemini_Generated_Image%282%29-1709853687005.jpeg.jpg",
//     },
//   },
// ];

const Friends = () => {
  const { loading, error, data } = useQuery(GET_USERS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  return (
    <div className={styles.container}>
      {data.allUsers.data.map((user: any) => (
        <div
          key={user.firstName}
          className={styles.friendItem}>
          <div className={styles.avatarContainer}>
            <Image
              src={user.avatar.url}
              alt={user.firstName}
              fill
              className={styles.avatar}
            />
          </div>
          {user.firstName}
        </div>
      ))}
    </div>
  );
};

export default Friends;
