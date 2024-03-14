import styles from "@/styles/components/helpers/Feedback.module.css";

import Link from "next/link";
import { PiTelegramLogoThin } from "react-icons/pi";

const FeedbackButton = () => {
  // const [isVisible, setIsVisible] = useState(false);

  // const handleScroll = () => {
  //   const yOffset = window.scrollY;
  //   const showThreshold = 100; // Порог, когда кнопка должна появиться

  //   if (yOffset > showThreshold) {
  //     setIsVisible(true);
  //   } else {
  //     setIsVisible(false);
  //   }
  // };

  // const handleFeedback = () => {
  //   window.scrollTo({
  //     top: 0,
  //     behavior: "smooth",
  //   });
  // };

  // useEffect(() => {
  //   window.addEventListener("scroll", handleScroll);

  //   return () => {
  //     window.removeEventListener("scroll", handleScroll);
  //   };
  // }, []);

  return (
    <div>
      <Link
        className={styles.scrollToTopButton}
        target="_blank"
        href={"https://t.me/+tG6pSpHWPPFiYzMy"}>
        <PiTelegramLogoThin className={styles.icon} />
        <div>feedback</div>
      </Link>
    </div>
  );
};

export default FeedbackButton;
