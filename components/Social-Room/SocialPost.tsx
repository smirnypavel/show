import React, { useState } from "react";
import { Comfortaa } from "next/font/google";
import { BiLike, BiDislike } from "react-icons/bi";

import styles from "@/styles/Social-Room/SocialPost.module.css";
import Image from "next/image";

interface PostProps {
  post: {
    author: string;
    avatar: string;
    content: string;
    image?: string; // Optional image property
    date: string;
    like: number;
    dislikes: number;
  };
}
const comfortaa = Comfortaa({ weight: ["400"], subsets: ["latin"] });

const Post: React.FC<PostProps> = ({ post }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleReadMoreClick = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <article className={styles.post}>
      <div className={styles.header}>
        <div className={styles.avatarContainer}>
          <Image
            src={post.avatar}
            alt={post.author}
            className={styles.avatar}
            fill
          />
        </div>
        <div className={styles.authorInfo}>
          <p className={styles.authorName}>{post.author}</p>
          <p className={styles.date}>{post.date}</p>
        </div>
      </div>
      <div className={styles.content}>
        {post.image && (
          <div className={styles.imageContainer}>
            <Image
              src={post.image}
              alt="Post image"
              className={styles.image}
              fill
            />
          </div>
        )}

        <p className={styles.description}>
          {isExpanded ? post.content : `${post.content.slice(0, 100)}...`}
          {post.content.length > 100 && (
            <button
              type="button"
              className={`${comfortaa.className} ${styles.readMoreButton}`}
              onClick={handleReadMoreClick}>
              {isExpanded ? "Меньше" : "Більше"}
            </button>
          )}
        </p>
      </div>
      <div className={styles.actions}>
        <div className={styles.likesContainer}>
          <span className={styles.like}>
            {post.like}
            <BiLike />
          </span>
          <span className={styles.disLike}>
            {post.dislikes}
            <BiDislike />
          </span>
        </div>
        {/* <span className={styles.action}>Comment</span> */}
      </div>
    </article>
  );
};

export default Post;
