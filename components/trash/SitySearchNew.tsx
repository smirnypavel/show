import React, { useState, useEffect } from "react";
import customGeo from "@/public/custom.geo.json";

interface City {
  name: string;
  latitude: number;
  longitude: number;
  place: string;
  placed_id: number;
}

const SearchCity: React.FC = () => {
  const [cities, setCities] = useState<City[]>([]);
  const [query, setQuery] = useState("");
  const [selectedCity, setSelectedCity] = useState<City | null>(null);

  useEffect(() => {
    if (query.length >= 2) {
      const fetchCities = async () => {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?q=${query}&format=json&countrycodes=ua&addressdetails=1&accept-language=ua&polygon_geojson=${customGeo}`
        );
        const data = await response.json();
        // console.log(data);
        // Filter by type and extract relevant fields
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
            placed_id: item.place_id,
          }));

        // Implement partial matching logic
        const lowerCaseQuery = query.toLowerCase();
        const matchedCities = filteredCities.filter((city: { name: string }) =>
          city.name.toLowerCase().includes(lowerCaseQuery)
        );

        setCities(matchedCities);
      };

      fetchCities();
    } else {
      // Clear cities if query is less than 3 characters
      setCities([]);
    }
  }, [query]);

  const handleCityClick = (city: City) => {
    setSelectedCity(city);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Введите название населенного пункта..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <ul>
        {cities.map((city) => (
          <li
            key={city.placed_id}
            onClick={() => handleCityClick(city)}>
            {city.name} ({city.place})
          </li>
        ))}
      </ul>
      {selectedCity && (
        <p>
          {/* Выбранный город: {selectedCity.name} ({selectedCity.place}) */}
        </p>
      )}
    </div>
  );
};

export default SearchCity;
