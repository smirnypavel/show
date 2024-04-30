import React, { useState } from "react";
import { YouTubeEmbed } from "@next/third-parties/google";

const YouTube2 = ({ url }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const getVideoId = (url) => {
    if (typeof url === "string") {
      // Регулярное выражение для извлечения идентификатора видео из ссылки
      const match = url.match(
        /(?:youtube\.com\/(?:[^/]+\/.+\/|(?:embed|v|watch(?:\/|\?.*v=)))|youtu\.be\/|youtube\.com\/shorts\/)([a-zA-Z0-9_-]{11})/
      );
      return match?.[1]; // Возвращаем первое совпадение, которое содержит идентификатор видео
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
    <>
      <YouTubeEmbed
        videoid={videoId}
        height="100%"
        width="100%"
        params="controls=2&showinfo=0&rel=0&fs=1&modestbranding=1"
      />
    </>
  );
};

export default YouTube2;
