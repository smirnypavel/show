import Post from "@/components/Social-Room/SocialPost";
import RichTextEditor from "@/components/Ui/ReachText";
import styles from "@/styles/Social-Room/SocialRoom.module.css";
import { useState } from "react";
import Friends from "./Friends";

const posts = [
  {
    id: 1,
    author: "John Doe",
    avatar:
      "https://res.cloudinary.com/dciy3u6un/image/upload/v1707752537/user-64ff012f1424c2d37e2d0467/avatar-banerRegister-1707752535384.jpeg.jpg",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit Lorem ipsum dolor sit amet, consectetur adipiscing elit Lorem ipsum dolor sit amet, consectetur adipiscing elit Lorem ipsum dolor sit amet, consectetur adipiscing elit Lorem ipsum dolor sit amet, consectetur adipiscing elit Lorem ipsum dolor sit amet, consectetur adipiscing elit Lorem ipsum dolor sit amet, consectetur adipiscing elit Lorem ipsum dolor sit amet, consectetur adipiscing elit Lorem ipsum dolor sit amet, consectetur adipiscing elit Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    image:
      "https://res.cloudinary.com/dciy3u6un/image/upload/v1707785351/user-64ff012f1424c2d37e2d0467/Gemini_Generated_Image%282%29-1707785350934.jpeg.jpg",
    date: "2024-03-22",
    like: 3,
    dislikes: 1,
  },
  {
    id: 2,
    author: "John Doe",
    avatar:
      "https://res.cloudinary.com/dciy3u6un/image/upload/v1707752537/user-64ff012f1424c2d37e2d0467/avatar-banerRegister-1707752535384.jpeg.jpg",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit Lorem ipsum dolor sit amet, consectetur adipiscing elit Lorem ipsum dolor sit amet, consectetur adipiscing elit Lorem ipsum dolor sit amet, consectetur adipiscing elit Lorem ipsum dolor sit amet, consectetur adipiscing elit Lorem ipsum dolor sit amet, consectetur adipiscing elit Lorem ipsum dolor sit amet, consectetur adipiscing elit Lorem ipsum dolor sit amet, consectetur adipiscing elit Lorem ipsum dolor sit amet, consectetur adipiscing elit Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    image:
      "https://res.cloudinary.com/dciy3u6un/image/upload/v1707785351/user-64ff012f1424c2d37e2d0467/Gemini_Generated_Image%282%29-1707785350934.jpeg.jpg",
    date: "2024-03-22",
    like: 5,
    dislikes: 1,
  },
  {
    id: 3,
    author: "John Doe",
    avatar:
      "https://res.cloudinary.com/dciy3u6un/image/upload/v1707752537/user-64ff012f1424c2d37e2d0467/avatar-banerRegister-1707752535384.jpeg.jpg",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit Lorem ipsum dolor sit amet, consectetur adipiscing elit Lorem ipsum dolor sit amet, consectetur adipiscing elit Lorem ipsum dolor sit amet, consectetur adipiscing elit Lorem ipsum dolor sit amet, consectetur adipiscing elit Lorem ipsum dolor sit amet, consectetur adipiscing elit Lorem ipsum dolor sit amet, consectetur adipiscing elit Lorem ipsum dolor sit amet, consectetur adipiscing elit Lorem ipsum dolor sit amet, consectetur adipiscing elit Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    image:
      "https://res.cloudinary.com/dciy3u6un/image/upload/v1707785351/user-64ff012f1424c2d37e2d0467/Gemini_Generated_Image%282%29-1707785350934.jpeg.jpg",
    date: "2024-03-22",
    like: 12,
    dislikes: 1,
  },
];

const SocialRoom = () => {
  const [showRichText, setShowRichText] = useState(false);
  const handleShowRichText = () => {
    setShowRichText(!showRichText);
  };
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div>
          <RichTextEditor />
          <div>
            <h2>Ваші колеги</h2>
            <Friends />
          </div>
        </div>

        <div className={styles.postsContainer}>
          {posts.map((post) => (
            <Post
              key={post.id}
              post={post}
            />
          ))}
        </div>
        <div className={styles.rightContainer}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio, amet
          perspiciatis, voluptatibus, modi neque totam perferendis nisi
          reiciendis a accusantium consectetur quidem nobis qui soluta dolor ex
          facilis minus obcaecati! Blanditiis consectetur velit maxime quasi,
          asperiores harum similique hic maiores. Dignissimos, eius tenetur,
          veritatis unde tempora quod minima nesciunt magni consequuntur ea nemo
          eligendi eum odio sapiente quae facilis dicta. Omnis, odit error
          dolore magnam corrupti facilis sapiente consequuntur expedita dolorum
          sit doloremque adipisci! Architecto odit rem reiciendis sint,
          dignissimos velit vel, beatae ut in facilis quam aliquam magni nulla.
          Obcaecati nobis sunt voluptas doloremque quaerat eum vero, numquam
          praesentium unde labore officia
        </div>
      </div>
    </div>
  );
};

export default SocialRoom;
