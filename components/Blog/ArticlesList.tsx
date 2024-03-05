import styles from "@/styles/components/Articles/ArticlesList.module.css";
import { IArticle } from "@/types/IArticles";
import Image from "next/image";

export interface ItemListProps {
  articles: IArticle[];
}

const ArticleList: React.FC<ItemListProps> = ({ articles }) => {
  if (!articles || articles.length === 0) {
    return <p className={styles.noArticles}>No articles found</p>;
  }

  return (
    <div className={styles.articleList}>
      {articles.map((article, index) => (
        <div
          key={index}
          className={styles.articleItem}>
          <div className={styles.imageContainer}>
            <Image
              src={article.img[0]}
              fill
              alt={article.title}
              layout="fill"
              objectFit="cover"
              className={styles.articleImage}
            />
          </div>
          <div className={styles.articleContent}>
            <h3 className={styles.articleTitle}>{article.title}</h3>
            <div
              className={styles.articleDescription}
              dangerouslySetInnerHTML={{ __html: article.smallDescription }}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default ArticleList;
