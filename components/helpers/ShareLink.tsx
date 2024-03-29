import React, { useState } from "react";
import { PiShareFatLight } from "react-icons/pi";
import styles from "@/styles/components/helpers/ShareLink.module.css";
import {
  FacebookShareButton,
  FacebookIcon,
  ViberIcon,
  ViberShareButton,
  TelegramIcon,
  TelegramShareButton,
} from "react-share";
interface SharedProps {
  id: string;
}
const ShareLink: React.FC<SharedProps> = ({ id }) => {
  const [isShow, setIsShow] = useState(false);
  const shareUrl = `https://www.wechirka.com/artists/${id}`;
  const title = "Профіль на wechirka.com ";
  const handleShow = () => {
    setIsShow(!isShow);
  };
  return (
    <div>
      <h5 className={styles.label}>Подiлитись</h5>
      {isShow && (
        <div className={styles.linkMobileContainer}>
          <FacebookShareButton url={shareUrl}>
            <FacebookIcon
              size={32}
              round
            />
          </FacebookShareButton>
          <TelegramShareButton
            url={shareUrl}
            title={title}
            className="Demo__some-network__share-button">
            <TelegramIcon
              size={32}
              round
            />
          </TelegramShareButton>
          <ViberShareButton
            url={shareUrl}
            title={title}
            className="Demo__some-network__share-button">
            <ViberIcon
              size={32}
              round
            />
          </ViberShareButton>
        </div>
      )}
      <PiShareFatLight
        className={styles.sharedIcon}
        onClick={handleShow}
      />

      <div className={styles.linkContainer}>
        <FacebookShareButton url={shareUrl}>
          <FacebookIcon
            size={32}
            round
          />
        </FacebookShareButton>
        <TelegramShareButton
          url={shareUrl}
          title={title}
          className="Demo__some-network__share-button">
          <TelegramIcon
            size={32}
            round
          />
        </TelegramShareButton>
        <ViberShareButton
          url={shareUrl}
          title={title}
          className="Demo__some-network__share-button">
          <ViberIcon
            size={32}
            round
          />
        </ViberShareButton>
      </div>
    </div>
  );
};

export default ShareLink;
