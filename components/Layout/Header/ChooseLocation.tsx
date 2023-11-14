import { useState } from "react";
import { LoadScript, Autocomplete } from "@react-google-maps/api";

const AutocompleteComponent: React.FC = () => {
  const [selectedPlace, setSelectedPlace] = useState<string>("");

  const handlePlaceChanged = () => {
    const autocomplete = document.getElementById(
      "autocomplete"
    ) as HTMLInputElement;

    if (autocomplete) {
      const place = autocomplete.value;
      console.log(place); // Process the selected city or region
      setSelectedPlace(place);
    }
  };

  return (
    <LoadScript
      googleMapsApiKey="AIzaSyDC3bqKHvQCfyZKUCLbkj-J-it_jomt0vg"
      libraries={["places"]}>
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
          placeholder="Введите город или область"
          style={{ width: "300px" }}
        />
      </Autocomplete>
    </LoadScript>
  );
};

export default AutocompleteComponent;
