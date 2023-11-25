import Link from "next/link";

import styles from "@/styles/components/Artist/ArtistList.module.css";
import { IArticle } from "@/types/IArticles";

export interface ItemListProps {
  articles: IArticle[];
}

const ArticleList: React.FC<ItemListProps> = ({ articles }) => {
  if (!articles || articles.length === 0) {
    return <p>No artists found</p>; // Заглушка или сообщение об отсутствии данных
  }

  return (
    <div className={styles.container}>
      <p>ArticleList</p>
      <ul className={styles.artistList}>
        {articles &&
          articles.map((article) => (
            <li
              key={article._id}
              className={styles.artistItem}>
              <Link href={`/blog/${article._id}`}>
                <div>
                  <p> Назва: {article.title}</p>
                </div>
                <div
                  dangerouslySetInnerHTML={{ __html: article.description }}
                />
              </Link>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default ArticleList;
