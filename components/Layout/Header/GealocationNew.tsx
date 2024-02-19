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
      navigator.geolocation.getCurrentPosition((position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          city: null, // Включите свойство `city`, даже если оно имеет значение `null`
        });

        // Получить город по координатам
        async function getCity() {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${position.coords.latitude}&lon=${position.coords.longitude}&accept-language=ua&format=json`
          );
          const data = await response.json();
          console.log(data);
          if (data) {
            localStorage.setItem(
              "userCity",
              `${data.address.city}, ${data.address.state}`
            );
          } else return;
        }

        getCity();
      });
    } else {
      console.log("Geolocation not supported");
    }
  }, []);

  return <div></div>;
};

export default Geolocation;
