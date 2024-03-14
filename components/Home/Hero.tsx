import React, { useState, useEffect } from "react";
import styles from "@/styles/Home/Hero.module.css";
import Image from "next/image";
import heroBanner from "@/public/baners/heroBanner.jpeg";
import heroBanner2 from "@/public/baners/heroBanner2.png";
import facebookBanner from "@/public/baners/facebookBanner.png";
const heroContents = [
  {
    title: "Вітаємо в нашому захоплюючому світі неперевершених свят!",
    description:
      "Де кожен момент - це можливість втілити ваші найяскравіші ідеї.",
    link: " https",
    linkName: "Долучитися зараз",
    bannerImg: heroBanner,
  },
  {
    title: "Вітаємо в нашому свят!",
    description: "Де кожен момент  ідеї.",
    link: " https",
    linkName: "Долучитися",
    bannerImg: heroBanner2,
  },
  {
    title: "Будь у курсі всіх новин!",
    description: "Підпишись на нашу сторінку у Facebook.",
    link: "https://www.facebook.com/people/Wechirka/61556196121327/",
    linkName: "Перейти",
    bannerImg: facebookBanner,
  },
];

const Hero = () => {
  const [currentContentIndex, setCurrentContentIndex] = useState(0);

  const handleNext = () => {
    setCurrentContentIndex((prevIndex) =>
      prevIndex === heroContents.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrev = () => {
    setCurrentContentIndex((prevIndex) =>
      prevIndex === 0 ? heroContents.length - 1 : prevIndex - 1
    );
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      handleNext();
    }, 5000);

    return () => clearTimeout(timer);
  }, [currentContentIndex]);

  return (
    <section className={styles.hero}>
      <div className={styles.heroContent}>
        <h1 className={styles.heroTitle}>
          {heroContents[currentContentIndex].title}
        </h1>
        <p className={styles.heroDescription}>
          {heroContents[currentContentIndex].description}
        </p>
        <button className={styles.heroButton}>
          {heroContents[currentContentIndex].linkName}
        </button>
      </div>
      <div className={styles.heroImage}>
        <Image
          src={heroContents[currentContentIndex].bannerImg}
          alt={"heroBanner"}
          fill
          className={styles.heroBanner}
        />
      </div>
    </section>
  );
};

export default Hero;
