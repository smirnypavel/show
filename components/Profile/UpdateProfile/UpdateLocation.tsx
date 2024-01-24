import React, { useEffect, useState } from "react";
import { LoadScript, Autocomplete, Libraries } from "@react-google-maps/api";
import styles from "@/styles/components/Profile/UpdateProfile/UpdateLocation.module.css";
// import { TbPencil } from "react-icons/tb";

interface AutocompleteProps {
  onCitySelect: (city: string) => void;
}

const libraries: Libraries = ["places"]; // Массив строк обернут в массив объектов типа Library

const UpdateLocation: React.FC<AutocompleteProps> = ({ onCitySelect }) => {
  const [selectedPlace, setSelectedPlace] = useState("");

  const handlePlaceChanged = () => {
    const autocomplete = document.getElementById(
      "autocomplete"
    ) as HTMLInputElement;

    if (autocomplete) {
      const place = autocomplete.value;
      setSelectedPlace(place);
      onCitySelect(place);
    }
  };

  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = `
      .pac-container {
        // background-color: rgb(108, 103, 103);
        background-color: transparent;
        padding: 5px;
        border-radius: 5px;
        box-shadow: 0 0 10px rgba(247, 241, 241, 0.2);
        position: absolute;
        top: 100%;
        left: 0;
        z-index: 1000;
        max-height: 208px;
        overflow-y: auto;
      

        // color: white;
      }

      .pac-item {
        background-color:  white;
        margin-bottom: 1px;
        padding: 3px 5px;
        cursor: pointer;
        // color: white;
        border-radius: 8px;
       


      }

      .pac-item:hover {
        background-color: var(--button-bg-color);
        color: white;
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <>
      <LoadScript
        googleMapsApiKey="AIzaSyDC3bqKHvQCfyZKUCLbkj-J-it_jomt0vg"
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
            <input
              id="autocomplete"
              type="text"
              placeholder="Введіть назву міста"
              className={styles.input}
            />
          </Autocomplete>
        </div>
      </LoadScript>
    </>
  );
};

export default UpdateLocation;
