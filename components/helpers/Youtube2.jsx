import React, { useState } from "react";
import { YouTubeEmbed } from "@next/third-parties/google";

const YouTube3 = ({ url }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const getVideoId = (url) => {
    if (typeof url === "string") {
      const match = url.match(
        /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
      );
      return match?.[1];
    }
    return undefined;
  };

  // Получаем videoId из введенной пользователем ссылки
  const videoId = getVideoId(url);
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  return (
    <YouTubeEmbed
      videoid={videoId}
      height={168}
      width={300}
      params="controls=2&showinfo=0&rel=0&fs=1&modestbranding=1"
    />
  );
};
export default YouTube3;
