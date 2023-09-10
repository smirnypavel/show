import React from "react";
import RegistrationForm, {
  FormValues,
} from "@/components/Auth/RegistrationForm"; // Замените на путь к вашему компоненту RegistrationForm

const Registry = () => {
  // Обработчик, который будет вызван при успешной регистрации
  const handleRegistration = (values: FormValues) => {
    // Здесь вы можете выполнить необходимые действия при регистрации,
    // например, отправить данные на сервер
    // После успешной регистрации, например, перенаправьте пользователя на страницу входа
    // Или выполните другие действия в зависимости от вашего приложения
  };

  return (
    <div>
      <h2>Регистрация</h2>
      <RegistrationForm onSubmit={handleRegistration} />
    </div>
  );
};

export default Registry;
