/* eslint-disable react/no-unescaped-entities */
import React from "react";
import styles from "@/styles/Home/RequestInfo.module.css";

const RequestInfo = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Як це працює</h1>
      <p className={styles.text}>
        <span className={styles.textNumber}>1.</span> Створюєшь запит за
        допомогою форми (важливо щоб усі поля були заповнені) та натиснути
        кнопку
        <button className={styles.submitButton}>
          <div className={styles.textWrapper}> Створити запит</div>
        </button>
      </p>
      <p className={styles.text}>
        <span className={styles.textNumber}>2.</span> Відкриється вікно, де буде
        вам запропоновано підключити ЧАТ-БОТ та ввести код верифікації. Виберіть
        зручний для Вас месенджер та натисніть на Qr код обо відскануйте
        телефоном
      </p>
      <p className={styles.text}>
        <span className={styles.textNumber}>3.</span> В ЧАТ-БОТІ вам потрібно
        натиснути кнопку start, після чого Вам необхідно буде поділитися номером
        телефона (у Telegram натиснути кнопку поділитись номером, у Viber ввести
        в ручну номер свого телефона) це потрібно зробити один раз для реєстрції
        в ЧАТ-БОТІ
      </p>

      <p className={styles.text}>
        <span className={styles.textNumber}>4.</span> Після реєстрації Вам у
        ЧАТ-БОТ прийде код для верифікації. Тепер Вам потрібно повернутись до
        сайту Wechirka для того щоб ввести код верифікації та натиснути
        "Відправити"
      </p>
      <p className={styles.text}>
        <span className={styles.textNumber}>5.</span> Після того як Ви
        відправили код, Ваш запит відразу надішлется тільки тим віконавцям яких
        Ви шукаєте
      </p>
      <h4 className={styles.bottomTitle}>
        Я Вас вітаю тепер вам залишилось тільки зачекати коли до Вас в ЧАТ-БОТ
        прийдуть відгуки від виконавців{" "}
      </h4>
    </div>
  );
};

export default RequestInfo;
