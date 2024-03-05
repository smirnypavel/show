import React from "react";
import styles from "@/styles/Home/Hero.module.css";

const Hero = () => {
  return (
    <section className={styles.hero}>
      <div className={styles.heroContent}>
        <h1 className={styles.heroTitle}>
          Вітаємо в нашому захоплюючому світі творчості!
        </h1>
        <p className={styles.heroDescription}>
          Де кожен момент - це можливість втілити ваші найяскравіші ідеї.
        </p>
        <button className={styles.heroButton}>Долучитися зараз</button>
      </div>
      <div className={styles.heroImage}>
        {/* Додайте зображення, яке підходить для вашого контенту */}
      </div>
    </section>
  );
};

export default Hero;
