import { useEffect, useState } from "react";

const UserLocation: React.FC = () => {
  const [userCity, setUserCity] = useState<string>("");

  useEffect(() => {
    const apiKey = "AIzaSyDC3bqKHvQCfyZKUCLbkj-J-it_jomt0vg";

    fetch(`https://www.googleapis.com/geolocation/v1/geolocate?key=${apiKey}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        considerIp: true,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        const { location } = data;
        fetch(
          `https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.lat},${location.lng}&key=${apiKey}`
        )
          .then((response) => response.json())
          .then((geoData) => {
            const city = geoData.results[0]?.address_components.find(
              (component: { types: string[] }) =>
                component.types.includes("locality")
            )?.long_name;

            if (city) {
              setUserCity(city);
            } else {
              setUserCity("Информация о городе недоступна 1");
            }
          })
          .catch((error) => {
            console.error(
              "Ошибка при получении информации о местоположении:",
              error
            );
            setUserCity("Информация о городе недоступна 2");
          });
      })
      .catch((error) => {
        console.error("Ошибка при запросе к API:", error);
        setUserCity("Информация о городе недоступна 3");
      });
  }, []);

  return (
    <div>
      <h2>Ваш город: {userCity}</h2>
    </div>
  );
};

export default UserLocation;
