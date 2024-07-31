import React, { useState, useEffect } from "react";
import customGeo from "@/public/custom.geo.json";
import styles from "@/styles/components/Profile/UpdateProfile/FirstRegister/SerchCityRegister.module.css";
import { useAppDispatch } from "@/redux/hooks";
import { updateUser } from "@/redux/auth/authOperations";

interface City {
  name: string;
  latitude: number;
  longitude: number;
  place: string;
  place_id: number;
}

const SearchCityRegister: React.FC = () => {
  const [cities, setCities] = useState<City[]>([]);
  const [query, setQuery] = useState("");
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [requestCity, setRequestCity] = useState<string | null>(null);
  const dispatch = useAppDispatch();

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
          item.type === "village"
      )
      .map((item: any) => ({
        name: item.display_name,
        place: item.place,
        place_id: item.place_id,
      }));

    const lowerCaseQuery = query.toLowerCase();
    const matchedCities = filteredCities.filter((city: { name: string }) =>
      city.name.toLowerCase().includes(lowerCaseQuery)
    );

    setCities(matchedCities);
  };

  const handleCityClick = (city: City) => {
    setRequestCity(city.name);
    setSelectedCity(city.name.split(",")[0]);
    setQuery("");
    handleSubmit(); // Call handleSubmit when a city is selected
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedCity(null); // Clear selected city when input changes
    setQuery(e.target.value); // Update query state
  };

  const handleSubmit = () => {
    dispatch(updateUser({ location: requestCity }));
  };

  return (
    <div>
      <div className={styles.inputGroup}>
        <input
          type="text"
          placeholder="Введіть назву населеного пункту..."
          value={selectedCity || query}
          onChange={handleInputChange}
          className={styles.input}
        />
        {/* Удаляем кнопку Submit */}
      </div>
      {query && (
        <ul className={styles.itemList}>
          {cities.map((city) => (
            <li
              className={styles.item}
              key={city.place_id}
              onClick={() => handleCityClick(city)}>
              {city.name.split(",")[0]},{city.name.split(",")[2]},{" "}
              {city.name.split(",")[3]}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchCityRegister;
