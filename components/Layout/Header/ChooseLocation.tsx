import { useEffect, useState } from "react";
import { LoadScript, Autocomplete } from "@react-google-maps/api";
import styles from "@/styles/Layout/Header/city.module.css";

interface AutocompleteProps {
  onCitySelect: (city: string) => void;
}

const AutocompleteComponent: React.FC<AutocompleteProps> = ({
  onCitySelect,
}) => {
  const [selectedPlace, setSelectedPlace] = useState("");
  console.log(selectedPlace);

  const handlePlaceChanged = () => {
    const autocomplete = document.getElementById(
      "autocomplete"
    ) as HTMLInputElement;

    if (autocomplete) {
      const place = autocomplete.value;
      console.log(place); // Process the selected city or region
      setSelectedPlace(place);
      onCitySelect(place);
    }
  };

  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = `
      .pac-container {
        background-color: rgb(108, 103, 103);
        padding: 5px;
        border-radius: 5px;
        box-shadow: 0 0 10px rgba(247, 241, 241, 0.2);
        position: absolute;
        top: 100%;
        left: 0;
        z-index: 1000;
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
        background-color: #ea17174b;
        color: white;

      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <LoadScript
      googleMapsApiKey="AIzaSyDC3bqKHvQCfyZKUCLbkj-J-it_jomt0vg"
      language="uk"
      libraries={["places"]}>
      <div className={styles.autocompleteContainer}>
        <Autocomplete
          onLoad={(autocomplete) => {
            console.log("Autocomplete loaded:", autocomplete);
          }}
          onPlaceChanged={handlePlaceChanged}
          options={{
            types: ["(regions)"],
            // other options if needed
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
  );
};

export default AutocompleteComponent;
