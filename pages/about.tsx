import React from "react";
import styles from "@/styles/About/About.module.css";
import SceletonTopCategory from "@/components/helpers/Placeholders/SceletonTopCategory";

const About = () => {
  return (
    <div>
      <p className={styles.p}>
        Вітаю Вас!!! Але ми ще працюємо над ціею сторінкою
      </p>
      {/* <SceletonTopCategory /> */}
    </div>
  );
};

export default About;
