import React, { useState } from "react";
import styles from "@/styles/Artist/Artist.module.css";
import ArticleList from "@/components/Blog/ArticlesList";
import { GetServerSideProps } from "next/types";
import axios from "axios";
import { IArticle } from "@/types/IArticles";

export interface ItemsPageProps {
  articles: IArticle[];
}

const Blog: React.FC<ItemsPageProps> = ({ articles }) => {
  return (
    <div className={styles.container}>
      <ArticleList articles={articles} />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<
  ItemsPageProps
> = async () => {
  try {
    const response = await axios.get(`/posts/`);
    const articles: IArticle[] = response.data;
    return {
      props: {
        articles,
      },
    };
  } catch (error) {
    console.log("Error:", error);
    return {
      props: {
        articles: [],
      },
      revalidate: 10,
    };
  }
};

export default Blog;
