// ScrollToTopButton.js
import { useState, useEffect } from "react";
import styles from "@/styles/components/helpers/ScrollToTopButton.module.css"; // Создайте файл стилей для кнопки
import { FaArrowUp } from "react-icons/fa6";
const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  const handleScroll = () => {
    const yOffset = window.scrollY; // Use scrollY instead of deprecated pageYOffset

    if (yOffset > 100) {
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
      {isVisible && (
        <button
          className={styles.scrollToTopButton}
          onClick={scrollToTop}>
          <FaArrowUp className={styles.icon} />
        </button>
      )}
    </div>
  );
};

export default ScrollToTopButton;
