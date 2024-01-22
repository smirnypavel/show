import React, { useState, useEffect } from "react";

interface City {
  ref: number;
  description: string;
}

interface CitySearchProps {
  onSelectCity: (selectedCity: string) => void;
}

const CitySearch: React.FC<CitySearchProps> = ({ onSelectCity }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [cities, setCities] = useState<string[]>([]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSearchQuery = e.target.value;
    setSearchQuery(newSearchQuery);
  };

  const handleCitySelect = (selectedCity: string) => {
    setSearchQuery(selectedCity);
    setCities([]);
    onSelectCity(selectedCity);
    console.log(selectedCity);
  };

  useEffect(() => {
    const fetchCities = async () => {
      try {
        if (searchQuery.trim().length < 4) {
          setCities([]); // Очищаем список городов, если строка поиска не содержит минимальное количество символов
          return;
        }

        const response = await fetch(
          `https://api.sat.ua/study/hs/api/v1.0/main/json/getTowns/?searchString=${searchQuery}&language=uk`
        );

        if (!response.ok) {
          throw new Error("Ошибка при запросе к API");
        }

        const data = await response.json();

        if (Array.isArray(data.data)) {
          const cityDescriptions = data.data.map(
            (city: City) => city.description
          );
          setCities(cityDescriptions);
        } else {
          console.error(
            "Ошибка: Ожидался массив данных, но получено что-то другое:",
            data
          );
        }
      } catch (error) {
        console.error("Ошибка при запросе к API:", error);
      }
    };

    fetchCities(); // Вызываем функцию fetchCities сразу после объявления useEffect
  }, [searchQuery]);

  return (
    <div>
      <input
        type="text"
        placeholder="Введіть назву міста"
        value={searchQuery}
        onChange={handleInputChange}
      />
      <ul>
        {cities &&
          cities.map((city, ref) => (
            <li
              key={ref}
              onClick={() => handleCitySelect(city)}>
              {city}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default CitySearch;
