import React, { useEffect } from "react";
import Lottie from "lottie-web";
import styles from "@/styles/404.module.css";
import { useRouter } from "next/router";

const NotFound: React.FC = () => {
  const router = useRouter();

  const animationRef = React.useRef<HTMLDivElement>(null);
  const handleCancel = () => {
    router.push({
      pathname: "/artists",
    });
  };
  useEffect(() => {
    const animation = Lottie.loadAnimation({
      container: animationRef.current as HTMLDivElement,
      renderer: "svg",
      loop: true,
      autoplay: true,
      path: "/notFound.json",
    });
    return () => animation.destroy();
  }, []);

  return (
    <div className="error-404">
      <div
        className={styles.animation}
        ref={animationRef}
      />
      <div className={styles.contentContainer}>
        <h4>
          Вибачте але по Вашому запиту ні чого не знайдено. В свою чергу ми
          працюемо над тим щоб задовольнити Усі Ваші запити
        </h4>
        <button
          className={styles.button}
          onClick={handleCancel}>
          Скинути пошук та почати з початку
        </button>
      </div>
    </div>
  );
};

export default NotFound;
