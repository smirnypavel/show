import React, { useState, useEffect } from "react";
import customGeo from "@/public/custom.geo.json";
import styles from "@/styles/Layout/Header/city.module.css";

interface City {
  name: string;
  latitude: number;
  longitude: number;
  place: string;
  place_id: number;
}

interface AutocompleteProps {
  onCitySelect: (city: string) => void;
}

const SearchCity: React.FC<AutocompleteProps> = ({ onCitySelect }) => {
  const [cities, setCities] = useState<City[]>([]);
  const [query, setQuery] = useState("");
  const [selectedCity, setSelectedCity] = useState<string | null>(null);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (query.length >= 2) {
        fetchCities();
      } else {
        setCities([]);
      }
    }, 300); // 300ms задержка перед отправкой запроса

    return () => clearTimeout(delayDebounceFn);
  }, [query]);

  const fetchCities = async () => {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?q=${query}&format=json&countrycodes=ua&addressdetails=1&accept-language=ua&polygon_geojson=${customGeo}`
    );
    const data = await response.json();
    console.log(data);
    // Filter and map cities
    const filteredCities = data
      .filter(
        (item: any) =>
          item.type === "city" ||
          item.type === "administrative" ||
          item.type === "village" ||
          item.type === "town"
      )
      .map((item: any) => ({
        name: item.display_name,
        place: item.place,
        place_id: item.place_id,
      }));

    // Partial matching logic
    const lowerCaseQuery = query.toLowerCase();
    const matchedCities = filteredCities.filter((city: { name: string }) =>
      city.name.toLowerCase().includes(lowerCaseQuery)
    );

    setCities(matchedCities);
  };

  const handleCityClick = (city: City) => {
    setSelectedCity(city.name.split(",")[0]);

    onCitySelect(city.name);
    setQuery(""); // Clear query to allow new searches
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedCity(null); // Clear selected city when input changes
    setQuery(e.target.value); // Update query state
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Введіть назву міста..."
        value={selectedCity || query}
        onChange={handleInputChange}
        className={styles.input}
      />
      {query && (
        <ul className={styles.itemList}>
          {cities.map((city) => (
            <li
              className={styles.item}
              key={city.place_id}
              onClick={() => handleCityClick(city)}>
              {city.name.split(",")[0]},{city.name.split(",")[2]},{" "}
              {city.name.split(",")[3]},{" "}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchCity;
