import React, { useEffect } from "react";
import Lottie from "lottie-web";
import styles from "@/styles/404.module.css";
import Link from "next/link";

const Error404: React.FC = () => {
  const animationRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    const animation = Lottie.loadAnimation({
      container: animationRef.current as HTMLDivElement,
      renderer: "svg",
      loop: true,
      autoplay: true,
      path: "/404.json",
    });
    return () => animation.destroy();
  }, []);

  return (
    <div className={styles.container}>
      <div
        className={styles.animation}
        ref={animationRef}
      />
      <div className={styles.contentContainer}>
        <h4>Ой ой! Ця сторінка заблукала.</h4>
        <Link
          className={styles.button}
          href={"/"}>
          На головну
        </Link>
      </div>
    </div>
  );
};

export default Error404;
