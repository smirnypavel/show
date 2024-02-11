import React, { useEffect, useRef, useState } from "react";
import { LoadScript, Autocomplete, Libraries } from "@react-google-maps/api";
import styles from "@/styles/components/Artist/ChoseCity.module.css";
import { HiOutlineLocationMarker, HiX } from "react-icons/hi";
import { useRouter } from "next/router";

const googleMapsApiKey: string = process.env.NEXT_PUBLIC_GOOGLE_KEY || "";

const libraries: Libraries = ["places"];
const ChooseLocationArtist = () => {
  const router = useRouter();

  const [selectedPlace, setSelectedPlace] = useState("");
  const [isCitySelected, setIsCitySelected] = useState(false);
  const [userCity, setUserCity] = useState(localStorage.getItem("userCity"));
  const inputRef = useRef<HTMLInputElement>(null);
  const loc: string | null = localStorage.getItem("userCity");

  useEffect(() => {
    if (loc) {
      router.push({
        pathname: "/artists",
        query: {
          ...router.query,
          loc,
        },
      });
    }
  }, [loc]);

  const handlePlaceChanged = () => {
    const autocomplete = inputRef.current;

    if (autocomplete) {
      const place = autocomplete.value;
      localStorage.setItem("userCity", place);
      setUserCity(place);
      setSelectedPlace(place);
      // onCitySelect(place);
      setIsCitySelected(true);
    } else {
      setIsCitySelected(false);
    }
  };

  const handleClearInput = () => {
    setUserCity("Вся Україна");
    localStorage.removeItem("userCity");
    setUserCity("Вся Україна");
    setSelectedPlace("");

    router.push({
      pathname: "/artists",
      query: {
        ...router.query,
        loc: "",
      },
    });
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
              // value={storedCity || ""}
              placeholder={userCity || "Вся Україна"}
              className={styles.input}
              onFocus={() => {
                inputRef.current?.dispatchEvent(
                  new Event("input", { bubbles: true })
                );
              }}
            />
            {/* {selectedPlace && ( */}
            <button
              onClick={handleClearInput}
              className={styles.clearButton}
              tabIndex={-1}>
              <HiX />
            </button>
            {/* )} */}
          </div>
        </Autocomplete>
      </div>
    </LoadScript>
  );
};

export default ChooseLocationArtist;
