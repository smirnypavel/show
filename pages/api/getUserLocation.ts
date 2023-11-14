import { NextApiRequest, NextApiResponse } from "next";
import geoip from "geoip-lite";

const getUserLocation = (req: NextApiRequest, res: NextApiResponse) => {
  // Получение IP адреса пользователя
  const forwardedFor = req.headers["x-forwarded-for"];
  const userIP: string | undefined = Array.isArray(forwardedFor)
    ? forwardedFor[0]
    : forwardedFor || req.socket.remoteAddress;
  console.log(userIP);
  if (!userIP) {
    res.status(400).json({ error: "IP адрес пользователя не доступен" });
    return;
  }

  // Определение местоположения по IP
  const location = geoip.lookup(userIP);
  console.log(location);
  // Отправка информации о местоположении в качестве ответа
  if (location && location.city) {
    res.status(200).json({ city: location.city });
  } else {
    res.status(400).json({ error: "Информация о городе недоступна" });
  }
};

export default getUserLocation;
