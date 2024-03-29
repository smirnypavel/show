import React from "react";
import {
  FacebookShareButton,
  FacebookIcon,
  ViberIcon,
  ViberShareButton,
  TelegramIcon,
  TelegramShareButton,
} from "react-share";

const ShareLink = () => {
  const shareUrl = window.location.href;
  const title = "GitHub";

  return (
    <div>
      <h2>Поделиться ссылкой</h2>
      <FacebookShareButton url={shareUrl}>
        {" "}
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
  );
};

export default ShareLink;
