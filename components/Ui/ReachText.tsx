import React, { useState, useRef } from "react";
import { BiBold, BiItalic, BiUnderline } from "react-icons/bi";
import { PiSquareFill } from "react-icons/pi";
import { PiTextAlignJustify } from "react-icons/pi";
import { IoClose } from "react-icons/io5";
import {
  AiOutlineRedo,
  AiOutlineUndo,
  AiOutlineAlignLeft,
  AiOutlineAlignCenter,
  AiOutlineAlignRight,
} from "react-icons/ai";
import { MdOutlineAddAPhoto } from "react-icons/md";
import styles from "@/styles/components/Ui/RichTextEditor.module.css";
import CustomSelect from "./ColorSelect";
import CustomSelectFontSize from "./ReachText/FontsizeSelect";
import EmojiPicker from "./ReachText/EmojiPicker";
import Image from "next/image";

interface ColorOption {
  value: string;
  color: string;
}

const RichTextEditor: React.FC = () => {
  const [imageSrc, setImageSrc] = useState<string | null>(null);

  const [content, setContent] = useState<string>("");
  const textAreaRef = useRef<HTMLDivElement>(null);
  const [selectedColor, setSelectedColor] = useState<string>("black");
  const [textAlign, setTextAlign] = useState<string>("left");
  const [selectedFontSize, setSelectedFontSize] = useState<string>("medium");

  const applyStyle = (style: string) => {
    document.execCommand(style, false);
    if (textAreaRef.current) {
      textAreaRef.current.focus();
    }
  };

  const applyColor = (color: string) => {
    document.execCommand("foreColor", false, color);
    if (textAreaRef.current) {
      textAreaRef.current.focus();
    }
  };

  const handleTextAlign = (alignment: string) => {
    document.execCommand("justify" + alignment);
    setTextAlign(alignment);
    if (textAreaRef.current) {
      textAreaRef.current.focus();
    }
  };
  const handleFontSizeChange = (fontSize: string) => {
    console.log(fontSize);
    setSelectedFontSize(fontSize);
    document.execCommand("fontSize", false, fontSize); // Устанавливаем размер шрифта в пикселях
    if (textAreaRef.current) {
      textAreaRef.current.focus();
    }
  };

  // const insertEmoji = (emoji: string) => {
  //   document.execCommand("insertText", false, emoji);
  //   if (textAreaRef.current) {
  //     textAreaRef.current.focus();
  //   }
  // };

  const handleColorChange = (value: string) => {
    setSelectedColor(value);
    applyColor(value);
  };

  const colors: ColorOption[] = [
    { value: "white", color: "white" },
    { value: "red", color: "red" },
    { value: "blue", color: "blue" },
    { value: "green", color: "green" },
    // Add more colors as needed
  ];
  const fontSizes: string[] = ["1", "2", "3", "4", "5"];
  const handleAddPhoto = async () => {
    try {
      const fileInput = document.createElement("input");
      fileInput.type = "file";
      fileInput.accept = "image/*";
      fileInput.click();

      fileInput.onchange = async (e) => {
        const file = (e.target as HTMLInputElement).files?.[0];
        if (file) {
          const imageUrl = URL.createObjectURL(file);
          setImageSrc(imageUrl);
        }
      };
    } catch (error) {
      console.error("Error adding photo:", error);
    }
  };
  const handleDeletePreview = () => {
    setImageSrc(null);
  };

  return (
    <div className={styles.editorContainer}>
      <div className={styles.buttonsContainer}>
        <button
          onClick={() => applyStyle("bold")}
          className={styles.button}>
          <BiBold />
        </button>
        <button
          onClick={() => applyStyle("italic")}
          className={styles.button}>
          <BiItalic />
        </button>
        <button
          onClick={() => applyStyle("underline")}
          className={styles.button}>
          <BiUnderline />
        </button>
        {/* Выпадающий список для выбора цвета текста */}
        <CustomSelect
          options={colors}
          selectedValue={selectedColor}
          onSelectChange={handleColorChange}
          className={styles.select}
        />

        {/* Выравнивание текста */}
        <button
          onClick={() => handleTextAlign("left")}
          className={styles.button}
          style={{ fontWeight: textAlign === "left" ? "bold" : "normal" }}>
          <AiOutlineAlignLeft />
        </button>
        <button
          onClick={() => handleTextAlign("center")}
          className={styles.button}
          style={{ fontWeight: textAlign === "center" ? "bold" : "normal" }}>
          <AiOutlineAlignCenter />
        </button>
        <button
          onClick={() => handleTextAlign("right")}
          className={styles.button}
          style={{ fontWeight: textAlign === "right" ? "bold" : "normal" }}>
          <AiOutlineAlignRight />
        </button>
        <button
          onClick={() => handleTextAlign("full")}
          className={styles.button}
          style={{ fontWeight: textAlign === "full" ? "bold" : "normal" }}>
          <PiTextAlignJustify />
        </button>
        <CustomSelectFontSize
          options={fontSizes.map((fontSize) => ({
            value: fontSize,
            label: fontSize,
          }))}
          selectedValue={selectedFontSize}
          onSelectChange={handleFontSizeChange}
          className={styles.select}
        />

        <MdOutlineAddAPhoto
          onClick={handleAddPhoto}
          className={styles.addPhotoButton}
        />
      </div>
      {imageSrc && (
        <div className={styles.previewContainer}>
          <Image
            src={imageSrc}
            alt="Preview"
            className={styles.imagePreview}
            fill
          />
          <button
            type="button"
            onClick={handleDeletePreview}
            className={styles.deleteButton}>
            <IoClose className={styles.deleteButtonIcon} />
          </button>
        </div>
      )}
      <div
        ref={textAreaRef}
        contentEditable
        className={styles.textArea}
        onInput={(e) => setContent(e.currentTarget.innerHTML)}
      />
      <div className={styles.bottomButtonContainer}>
        <span></span>
        <button
          type="button"
          className={styles.buttonSubmit}>
          Опублікувати
        </button>
      </div>
    </div>
  );
};

export default RichTextEditor;
