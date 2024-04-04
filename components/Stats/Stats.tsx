import React from "react";
import styles from "@/styles/components/Stats/StatsPage.module.css";

import { useAppSelector } from "@/redux/hooks";
import { getUser } from "@/redux/auth/authSelectors";

const StatsPage = () => {
  const user = useAppSelector(getUser);
  console.log(user);
  // Функция для вычисления разницы в днях между двумя датами
  const getDaysOnSite = (createdAtString: any) => {
    const createdAt = new Date(createdAtString);
    const today = new Date();
    const differenceInTime = today.getTime() - createdAt.getTime();
    const differenceInDays = Math.floor(differenceInTime / (1000 * 3600 * 24));
    return differenceInDays;
  };

  const daysOnSite = getDaysOnSite(user.createdAt);

  return (
    <div className={styles.container}>
      <h2 className={styles.title}> Ваша статистика</h2>
      <div className={styles.stats}>
        <h4 className={styles.statsTitle}>Статистика профіля</h4>
        <ul>
          <li className={styles.statsItem}>
            <p>Днів на Wechirka: {daysOnSite}</p>
          </li>
          <li className={styles.statsItem}>
            <div>
              <p>Переглядів профілю:</p> <span>24</span>
              <p>Отсанній:</p> <span>сьогодні</span>
            </div>
          </li>
          <li className={styles.statsItem}>
            <div>
              {" "}
              <p>Статус прфілю: </p> <span>пробний період</span>
              <p>Закінчюєтьтся через:</p> <span>30 днів</span>
            </div>
          </li>
        </ul>
      </div>
      <div className={styles.stats}>
        <h4 className={styles.statsTitle}>Статистика запитів</h4>
        <ul>
          <li className={styles.statsItem}>
            <p>Запити по Вашому профілю:</p>
            <span>5</span>
          </li>
          <li className={styles.statsItem}>
            <p>Підтверджених:</p> <span>2</span>
          </li>
          <li className={styles.statsItem}>
            <p>Відхілиних: </p> <span>2</span>
          </li>
          <li className={styles.statsItem}>
            <p>Необроблених: </p> <span>1</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default StatsPage;
