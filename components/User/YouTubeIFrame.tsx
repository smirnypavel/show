import React from "react";

export interface Ilink {
  url: string;
}

const YouTubeEmbed = ({ url }: Ilink) => {
  // Функция для извлечения videoId из ссылки в формате "https://www.youtube.com/watch?v=XaTwnKLQi4A"
  const getVideoId = (url: string): string | undefined => {
    if (url) {
      const match = url.match(
        /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
      );
      return match?.[1];
    }
    return undefined;
  };

  // Получаем videoId из введенной пользователем ссылки
  const videoId = getVideoId(url);

  // Собираем ссылку для iframe
  const embeddedUrl = videoId
    ? `https://www.youtube.com/embed/${videoId}?si=xGMg4n--wgwb_w9R`
    : "";

  return (
    <div className="video-responsive">
      {videoId && (
        <iframe
          width="200"
          height="100"
          src={embeddedUrl}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen></iframe>
      )}
    </div>
  );
};

export default YouTubeEmbed;
