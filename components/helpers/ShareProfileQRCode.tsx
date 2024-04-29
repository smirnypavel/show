import React, { useState } from "react";
import QRCode from "qrcode.react";
import { CopyToClipboard } from "react-copy-to-clipboard";

const ShareProfileQRCode = () => {
  const [copied, setCopied] = useState(false);
  const [url, setUrl] = useState("www.wechirka.com");

  const handleCopy = () => {
    setCopied(true);
    // Дополнительные действия при копировании
  };

  const handleDownload = () => {
    const canvas = document.getElementById("qr-canvas") as HTMLCanvasElement;
    const imgData = canvas.toDataURL("image/png");
    const downloadLink = document.createElement("a");
    downloadLink.href = imgData;
    downloadLink.download = "qr_code.png";
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  return (
    <div>
      <QRCode
        id="qr-canvas"
        value={url}
      />
      <CopyToClipboard
        text={url}
        onCopy={handleCopy}>
        <button>Скопировать ссылку</button>
      </CopyToClipboard>
      <button onClick={handleDownload}>Скачать QR-код</button>
      {copied && <span style={{ color: "green" }}>Ссылка скопирована!</span>}
    </div>
  );
};

export default ShareProfileQRCode;
