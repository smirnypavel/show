import React, { useState, useEffect, useRef } from "react";
import customGeo from "@/public/custom.geo.json";
import styles from "@/styles/components/Artist/SearchCityArtistList.module.css";
import { useRouter } from "next/router";
import { PiXCircle } from "react-icons/pi";

interface City {
  name: string;
  latitude: number;
  longitude: number;
  place: string;
  place_id: number;
}

const SearchCityArtistList = () => {
  const router = useRouter();

  const [cities, setCities] = useState<City[]>([]);
  const [query, setQuery] = useState("");
  const [notification, setNotification] = useState(true);
  const [userCity, setUserCity] = useState(localStorage.getItem("userCity"));
  const inputRef = useRef<HTMLInputElement>(null);
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const loc: string | null = localStorage.getItem("userCity");
  const locQuestExists: boolean = localStorage.getItem("locQuest") !== null;

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
  useEffect(() => {
    if (locQuestExists) {
      setNotification(false);
    }
  }, [locQuestExists]);

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

    // Partial matching logic
    const lowerCaseQuery = query.toLowerCase();
    const matchedCities = filteredCities.filter((city: { name: string }) =>
      city.name.toLowerCase().includes(lowerCaseQuery)
    );

    setCities(matchedCities);
  };

  const handleCityClick = (city: City) => {
    setSelectedCity(city.name.split(",")[0]);
    localStorage.setItem("userCity", city.name.split(",")[0]);
    setUserCity(city.name.split(",")[0]);
    router.push({
      pathname: "/artists",
      query: {
        ...router.query,
        loc: city.name.split(",")[0],
      },
    });
    setQuery(""); // Clear query to allow new searches
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedCity(null); // Clear selected city when input changes
    setQuery(e.target.value); // Update query state
  };
  const handleCloseNotification = () => {
    localStorage.setItem("locQuest", "close");
    setNotification(false);
  };

  return (
    <div>
      <input
        ref={inputRef}
        type="text"
        placeholder={userCity || "Вся Україна"}
        value={selectedCity || query}
        onChange={handleInputChange}
        className={styles.input}
        onFocus={() => {
          inputRef.current?.dispatchEvent(
            new Event("input", { bubbles: true })
          );
        }}
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
      {notification && (
        <div className={styles.notificationWrapper}>
          <div className={styles.notification}>
            Локація вашого пошуку визначилася як:{" "}
            <span className={styles.cityName}>{userCity}</span> ?
            <button
              type="button"
              onClick={handleCloseNotification}
              className={styles.notificationClose}>
              <PiXCircle className={styles.notificationCloseIcon} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchCityArtistList;
