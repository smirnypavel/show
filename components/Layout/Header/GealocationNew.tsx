import React, { useState, useEffect } from "react";

interface Location {
  latitude: number | null;
  longitude: number | null;
  city: string | null;
}

const Geolocation = () => {
  const [location, setLocation] = useState<Location>({
    latitude: null,
    longitude: null,
    city: null,
  });

  useEffect(() => {
    const storedCity = localStorage.getItem("userCity");
    if (storedCity) {
      return; // Завершаем выполнение эффекта, если значение уже есть
    }

    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            city: null,
          });

          // Получить город по координатам
          async function getCity() {
            try {
              const response = await fetch(
                `https://nominatim.openstreetmap.org/reverse?lat=${position.coords.latitude}&lon=${position.coords.longitude}&accept-language=ua&format=json`
              );
              const data = await response.json();
              console.log(data);

              // Проверяем, существует ли название города
              const city =
                data.address.city ||
                data.address.town ||
                data.address.village ||
                data.address.administrative;
              if (city) {
                localStorage.setItem("userCity", city);
                setLocation((prevLocation) => ({
                  ...prevLocation,
                  city: city,
                }));
              } else {
                console.error("Город не найден");
              }
            } catch (error) {
              console.error("Ошибка при запросе к Nominatim:", error);
            }
          }

          getCity();
        },
        (error) => {
          console.error("Ошибка при получении геолокации:", error);
        }
      );
    } else {
      console.log("Geolocation not supported");
    }
  }, []);

  return <div></div>;
};

export default Geolocation;
