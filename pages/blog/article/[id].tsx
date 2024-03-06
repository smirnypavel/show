import styles from "@/styles/components/Articles/Article.module.css";
import { IArticle } from "@/types/IArticles";
import Image from "next/image";
import { GetStaticPaths, GetStaticProps } from "next";
import axios from "axios";

interface ArticleProps {
  article: IArticle;
}

const Article: React.FC<ArticleProps> = ({ article }) => {
  return (
    <div className={styles.article}>
      <h1 className={styles.articleTitle}>{article.title}</h1>
      <div className={styles.imageContainer}>
        <Image
          src={article.img[0]}
          fill
          alt={article.title}
          className={styles.articleImage}
        />
      </div>
      <div
        className={styles.articleContent}
        dangerouslySetInnerHTML={{ __html: article.description }}
      />
    </div>
  );
};
export const getStaticPaths: GetStaticPaths = async () => {
  try {
    const response = await axios.get(`/posts`);
    const articles: IArticle[] = response.data;

    const paths = articles.map((article) => ({
      params: { id: article._id.toString() },
    }));

    return {
      paths,
      fallback: true,
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return {
      paths: [],
      fallback: true,
    };
  }
};

export const getStaticProps: GetStaticProps<ArticleProps> = async ({
  params,
}) => {
  const { id } = params || {};

  if (!id) {
    return {
      notFound: true,
    };
  }

  try {
    const response = await axios.get(`/posts/${id}`);
    const article: IArticle = response.data;

    if (!article) {
      return {
        notFound: true,
      };
    }

    return {
      props: {
        article,
      },
      revalidate: 10,
    };
  } catch (error) {
    console.error("Error:", error);
    return {
      notFound: true,
    };
  }
};
export default Article;
