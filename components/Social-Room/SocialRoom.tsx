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
      "https://res.cloudinary.com/dciy3u6un/image/upload/v1709853194/user-65ea49a15e6bbb81c4e175a7/avatar-banerRegister-1709853193894.jpeg.jpg",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit Lorem ipsum dolor sit amet, consectetur adipiscing elit Lorem ipsum dolor sit amet, consectetur adipiscing elit Lorem ipsum dolor sit amet, consectetur adipiscing elit Lorem ipsum dolor sit amet, consectetur adipiscing elit Lorem ipsum dolor sit amet, consectetur adipiscing elit Lorem ipsum dolor sit amet, consectetur adipiscing elit Lorem ipsum dolor sit amet, consectetur adipiscing elit Lorem ipsum dolor sit amet, consectetur adipiscing elit Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    image:
      "https://res.cloudinary.com/dciy3u6un/image/upload/v1709853687/user-65ea49a15e6bbb81c4e175a7/Gemini_Generated_Image%282%29-1709853687005.jpeg.jpg",
    date: "2024-03-22",
    like: 3,
    dislikes: 1,
  },
  {
    id: 2,
    author: "John Doe",
    avatar:
      "https://res.cloudinary.com/dciy3u6un/image/upload/v1709853194/user-65ea49a15e6bbb81c4e175a7/avatar-banerRegister-1709853193894.jpeg.jpg",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit Lorem ipsum dolor sit amet, consectetur adipiscing elit Lorem ipsum dolor sit amet, consectetur adipiscing elit Lorem ipsum dolor sit amet, consectetur adipiscing elit Lorem ipsum dolor sit amet, consectetur adipiscing elit Lorem ipsum dolor sit amet, consectetur adipiscing elit Lorem ipsum dolor sit amet, consectetur adipiscing elit Lorem ipsum dolor sit amet, consectetur adipiscing elit Lorem ipsum dolor sit amet, consectetur adipiscing elit Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    image:
      "https://res.cloudinary.com/dciy3u6un/image/upload/v1709853704/user-65ea49a15e6bbb81c4e175a7/Gemini_Generated_Image%281%29-1709853704191.jpeg.jpg",
    date: "2024-03-22",
    like: 5,
    dislikes: 1,
  },
  {
    id: 3,
    author: "John Doe",
    avatar:
      "https://res.cloudinary.com/dciy3u6un/image/upload/v1709853194/user-65ea49a15e6bbb81c4e175a7/avatar-banerRegister-1709853193894.jpeg.jpg",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit Lorem ipsum dolor sit amet, consectetur adipiscing elit Lorem ipsum dolor sit amet, consectetur adipiscing elit Lorem ipsum dolor sit amet, consectetur adipiscing elit Lorem ipsum dolor sit amet, consectetur adipiscing elit Lorem ipsum dolor sit amet, consectetur adipiscing elit Lorem ipsum dolor sit amet, consectetur adipiscing elit Lorem ipsum dolor sit amet, consectetur adipiscing elit Lorem ipsum dolor sit amet, consectetur adipiscing elit Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    image:
      "https://res.cloudinary.com/dciy3u6un/image/upload/v1709853720/user-65ea49a15e6bbb81c4e175a7/Gemini_Generated_Image%283%29-1709853719708.jpeg.jpg",
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
