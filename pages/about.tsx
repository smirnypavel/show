import React from "react";
import styles from "@/styles/About/About.module.css";
import SkeletonTopArtist from "@/components/helpers/Placeholders/SkeletonTopArtist";

const About = () => {
  return (
    <div>
      <p className={styles.p}>
        Вітаю Вас!!! Але ми ще працюємо над ціею сторінкою
      </p>
      <SkeletonTopArtist />
    </div>
  );
};

export default About;
