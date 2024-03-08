import React, { useState, useEffect } from "react";
import styles from "@/styles/Home/Hero.module.css";
import Image from "next/image";

const heroContents = [
  {
    title: "Вітаємо в нашому захоплюючому світі неперевершених свят!",
    description:
      "Де кожен момент - це можливість втілити ваші найяскравіші ідеї.",
    link: " https",
    linkName: "Долучитися зараз",
    bannerImg: "/baners/heroBanner.jpeg",
  },
  {
    title: "Вітаємо в нашому свят!",
    description: "Де кожен момент  ідеї.",
    link: " https",
    linkName: "Долучитися",
    bannerImg: "/baners/heroBanner2.png",
  },
  {
    title: "Будь у курсі всіх новин!",
    description: "Підпишись на нашу сторінку у Facebook.",
    link: "https://www.facebook.com/people/Wechirka/61556196121327/",
    linkName: "Перейти",
    bannerImg: "/baners/facebookBanner.png",
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
      <div className={styles.buttonContainer}>
        <button
          onClick={handlePrev}
          className={styles.button}>
          Previous
        </button>
        <button
          onClick={handleNext}
          className={styles.button}>
          Next
        </button>
      </div>
    </section>
  );
};

export default Hero;
