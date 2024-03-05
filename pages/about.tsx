import React from "react";
import styles from "@/styles/About/AboutUsPage.module.css";
import Link from "next/link";

const AboutUsPage = () => {
  return (
    <div className={styles["about-us-container"]}>
      <h2>Ласкаво просимо у світ Wechirka!</h2>
      <p>
        Ми – команда ентузіастів, які створили Wechirka, щоб змінити спосіб,
        яким ви знаходите ідеальних артистів для ваших заходів. Не важливо, чи
        плануєте ви вечірку, весілля, корпоративну подію або просто хочете
        прикрасити свій день народження, ми тут, щоб допомогти вам зробити це
        незабутнім.
      </p>
      <h3>Що відрізняє нас від інших?</h3>
      <ul>
        <li>
          <strong>Інноваційний Підхід до Пошуку:</strong> У нас є звичайний{" "}
          <Link
            className={styles.link}
            href={"/artists"}>
            пошук
          </Link>{" "}
          за фільтрами та ключовими словами, але найцікавіший спосіб – це
          заповнити{" "}
          <Link
            className={styles.link}
            href={"/request"}>
            форму{" "}
          </Link>
          з вашим запитом. Опишіть мрію, і ми зробимо все можливе, щоб її
          здійснити.
        </li>
        <li>
          <strong>Персоналізовані Рекомендації:</strong> Ми аналізуємо ваш запит
          та підбираємо артистів, які відповідають вашим уподобанням. Так ви
          завжди можете бути впевнені, що отримуєте те, що вам потрібно.
        </li>
        <li>
          <strong>Простий і Швидкий Процес:</strong> З нашим зручним чат-ботом,
          ви можете отримати відгуки на свій запит і переглядати профілі
          артистів в реальному часі, без зайвих зусиль.
        </li>
      </ul>
      <div className={styles["social-media-links"]}>
        <p>
          Посилання на наші соціальні мережі:{" "}
          <a
            href="https://www.facebook.com/profile.php?id=61556196121327"
            target="_blank"
            rel="noopener noreferrer">
            Facebook
          </a>
          ,{" "}
          <a
            href="https://www.instagram.com/wechirka?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
            target="_blank"
            rel="noopener noreferrer">
            Instagram
          </a>
          ,{" "}
          <a
            href="https://www.youtube.com/channel/UCGimb06BfAc_QwaBMiEY91g"
            target="_blank"
            rel="noopener noreferrer">
            YouTube
          </a>
        </p>
      </div>
      <div className={styles["values-info"]}>
        <h3>Інформація про нашу філософію або цінності</h3>
        <p>
          Наша компанія прагне створювати творчий та відкритий простір для всіх,
          хто бажає знайти та забезпечити незабутні враження у світі мистецтва
          та розваг.
        </p>
      </div>
    </div>
  );
};

export default AboutUsPage;
