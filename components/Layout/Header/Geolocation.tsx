import React, { useEffect, useState } from "react";

const MyGeolocation: React.FC = () => {
  const [userCity, setUserCity] = useState<string>("");

  useEffect(() => {
    // Выполните запрос к API маршруту для получения города пользователя
    fetch("/api/getUserLocation")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Ошибка HTTP: ${response.status}`);
        }
        console.log(response);
        return response.json();
      })
      .then((data) => {
        if (data && data.city) {
          setUserCity(data.city);
        } else {
          setUserCity("Информация о городе недоступна");
        }
      })
      .catch((error) => {
        console.error("Ошибка при запросе к API:", error);
        setUserCity("Информация о городе недоступна");
      });
  }, []);

  return (
    <div>
      <h2>Ваш город: {userCity}</h2>
    </div>
  );
};

export default MyGeolocation;
