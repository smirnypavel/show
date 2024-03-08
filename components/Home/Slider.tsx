import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from "@/styles/Home/Slider.module.css";
import Image from "next/image";
import Link from "next/link";

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
    title: " Свори свято своїй дитині!",
    description:
      "Знайди талановитого аніматора на день нарожденя дитини за три кліки).",
    link: " https",
    linkName: "Знайти",
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

function Fade() {
  const settings = {
    dots: true,
    fade: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    // pauseOnHover: true,
    waitForAnimate: false,
    arrows: false, // Устанавливаем параметр arrows в false, чтобы убрать стрелки
  };
  return (
    <div className={styles.sliderContainer}>
      <Slider {...settings}>
        {heroContents.map((content, index) => (
          <div
            className={styles.heroContent}
            key={index}>
            <div className={styles.imageContainer}>
              <Image
                src={content.bannerImg}
                alt="bannerImg"
                fill
                style={{
                  objectFit: "cover",
                }}
              />
            </div>
            <div className={styles.contentContainer}>
              <h1 className={styles.heroTitle}>{content.title}</h1>
              <p className={styles.heroDescription}>{content.description}</p>
              <Link
                className={styles.heroButton}
                href={content.link}>
                {content.linkName}
              </Link>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default Fade;
