import { useState, useEffect } from "react";
import styles from "@/styles/components/helpers/ScrollToTopButton.module.css";
import { FaArrowUp } from "react-icons/fa6";

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  const handleScroll = () => {
    const yOffset = window.scrollY;
    const showThreshold = 100; // Порог, когда кнопка должна появиться

    if (yOffset > showThreshold) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div>
      <button
        className={`${styles.scrollToTopButton} ${
          isVisible ? styles.visible : ""
        }`}
        onClick={scrollToTop}>
        <FaArrowUp className={styles.icon} />
      </button>
    </div>
  );
};

export default ScrollToTopButton;
