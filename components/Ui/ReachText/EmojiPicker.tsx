import React from "react";
import styles from "@/styles/components/Ui/RichText/EmojiPicker.module.css";
interface EmojiPickerProps {
  onEmojiClick: (emoji: string) => void;
}

const EmojiPicker: React.FC<EmojiPickerProps> = ({ onEmojiClick }) => {
  const emojis = ["😊", "😎", "😀", "😍", "🤩", "👍", "❤️", "👏", "🎉", "💃"];

  return (
    <div className={styles.buttonContainer}>
      {emojis.map((emoji, index) => (
        <button
          className={styles.button}
          key={index}
          onClick={() => onEmojiClick(emoji)}>
          {emoji}
        </button>
      ))}
    </div>
  );
};

export default EmojiPicker;
