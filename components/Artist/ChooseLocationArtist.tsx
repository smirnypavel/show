import React, { useEffect, useRef, useState } from "react";
import { LoadScript, Autocomplete, Libraries } from "@react-google-maps/api";
import styles from "@/styles/components/Artist/ChoseCity.module.css";
import { HiOutlineLocationMarker, HiX } from "react-icons/hi";

interface AutocompleteProps {
  onCitySelect: (city: string) => void;
}
const googleMapsApiKey: string = process.env.NEXT_PUBLIC_GOOGLE_KEY || "";

const libraries: Libraries = ["places"];
const ChooseLocationArtist: React.FC<AutocompleteProps> = ({
  onCitySelect,
}) => {
  const [selectedPlace, setSelectedPlace] = useState("");
  const [isCitySelected, setIsCitySelected] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handlePlaceChanged = () => {
    const autocomplete = inputRef.current;

    if (autocomplete) {
      const place = autocomplete.value;
      setSelectedPlace(place);
      onCitySelect(place);
      setIsCitySelected(true);
    } else {
      setIsCitySelected(false);
    }
  };

  const handleClearInput = () => {
    setSelectedPlace("");
    onCitySelect(""); // Отправка пустой строки для очистки локации
    setIsCitySelected(false);
    if (inputRef.current) {
      inputRef.current.value = ""; // Очистка поля ввода
    }
  };

  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = `
      .pac-container {
        background-color: rgb(255, 255, 255);
        padding: 5px;
        border-radius: 5px;
        box-shadow: 0 0 10px rgba(247, 241, 241, 0.2);
        position: absolute;
        top: 100%;
        left: 0;
        z-index: 1;
        max-height: 200px;
        overflow-y: auto;
        color: white;
      }

      .pac-item {
        padding: 3px 5px;
        cursor: pointer;
        color: white;
      }

      .pac-item:hover {
        background-color: #5959594a;
        color: black;
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <LoadScript
      googleMapsApiKey={googleMapsApiKey}
      language="uk"
      libraries={libraries}>
      <div className={styles.autocompleteContainer}>
        <Autocomplete
          onLoad={(autocomplete) => {}}
          onPlaceChanged={handlePlaceChanged}
          options={{
            types: ["(regions)"],
            componentRestrictions: { country: "ua" },
          }}>
          <div className={styles.inputContainer}>
            <HiOutlineLocationMarker
              className={isCitySelected ? styles.geoIconActive : styles.geoIcon}
            />
            <input
              ref={inputRef}
              id="autocomplete"
              type="text"
              placeholder="Вся Україна"
              className={styles.input}
              onFocus={() => {
                inputRef.current?.dispatchEvent(
                  new Event("input", { bubbles: true })
                );
              }}
            />
            {selectedPlace && (
              <button
                onClick={handleClearInput}
                className={styles.clearButton}
                tabIndex={-1}>
                <HiX />
              </button>
            )}
          </div>
        </Autocomplete>
      </div>
    </LoadScript>
  );
};

export default ChooseLocationArtist;
