/* eslint-disable react/no-unescaped-entities */
import React, { useState, useEffect } from "react";
import styles from "@/styles/Home/HomeTopBanner/BannerRight.module.css";
import Image from "next/image";

const images = [
  { src: "/baners/banerMuzOb.jpeg" },
  { src: "/baners/kaver_gruppa.jpeg" },
  { src: "/baners/banerHostes2.jpeg" },
  { src: "/baners/banerWedding.jpeg" },
  { src: "/baners/banerAnimator.jpeg" },
  // Добавьте пути к вашим изображениям
];

const BannerRight = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Функция для переключения на следующий слайд
  const nextSlide = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === images.length - 1 ? 0 : prevSlide + 1
    );
  };

  const prevSlide = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === 0 ? images.length - 1 : prevSlide - 1
    );
  };

  // Устанавливаем интервал для автоматического переключения слайдов
  useEffect(() => {
    const interval = setInterval(nextSlide, 5000); // Меняем слайд каждые 3 секунды

    // Очищаем интервал при размонтировании компонента
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.slider}>
      <div className={styles.slideContainer}>
        {images.map((image, index) => (
          <div
            key={image.src}
            className={
              index === currentSlide ? styles.slideActive : styles.slide
            }>
            <div className={styles.bannerContainer}>
              <Image
                src={image.src}
                alt={"banner"}
                width={600}
                height={260}
                priority
                sizes="(min-width: 808px) 50vw, 100vw"
                className={styles.banner}
              />
              {image.src === "/baners/banerMuzOb.jpeg" && (
                <h3 className={styles.slideText}>Музичне обладнаня</h3>
              )}
              {image.src === "/baners/kaver_gruppa.jpeg" && (
                <h3 className={styles.slideText}>Кавер группа "Hardy man"</h3>
              )}
              {image.src === "/baners/banerHostes2.jpeg" && (
                <h3 className={styles.slideText}>Найкращі хостес</h3>
              )}
              {image.src === "/baners/banerWedding.jpeg" && (
                <h3 className={styles.slideText}>Прикрасимо Ваше весілля </h3>
              )}
              {image.src === "/baners/banerAnimator.jpeg" && (
                <h3 className={styles.slideText}>Веселі аніматори</h3>
              )}
            </div>
          </div>
        ))}
      </div>
      {/* <button
        type="button"
        className={styles.prevButton}
        onClick={prevSlide}>
        Prev
      </button>
      <button
        type="button"
        className={styles.nextButton}
        onClick={nextSlide}>
        Next
      </button> */}
    </div>
  );
};

export default BannerRight;
