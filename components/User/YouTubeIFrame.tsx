import React from "react";

const YouTubeEmbed = () => {
  return (
    <div className="video-responsive">
      <iframe
        width="500"
        height="200"
        // src="https://www.youtube.com/embed/JNDNsuMLkHc?si=Xo7qjvZYnV4Ge2wq"
        src="https://www.youtube.com/embed/XsVtSPgaRzI?si=Xo7qjvZYnV4Ge2wq"
        // src="https://www.youtube.com/watch?v=XsVtSPgaRzI"
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen></iframe>
    </div>
  );
};

export default YouTubeEmbed;
