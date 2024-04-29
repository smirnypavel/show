import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  ApolloLink,
} from "@apollo/client";
import { ApolloProvider } from "@apollo/client/react";
import { setContext } from "@apollo/client/link/context";

// Создаем HTTP ссылку для запросов
const httpLink = new HttpLink({
  uri: "https://events-4qv2.onrender.com/graphql",
});

// Создаем ApolloLink для добавления Bearer токена в заголовки запроса
const authLink = setContext((_, { headers }) => {
  // Получаем Bearer токен из localStorage или другого места, где он хранится
  const token = localStorage.getItem("token");

  // Возвращаем объект с заголовками, включая Bearer токен
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

// Комбинируем ApolloLink для авторизации и HTTP ссылку
const link = ApolloLink.from([authLink, httpLink]);

// Создаем клиент Apollo Client с заданными настройками
const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});

// Экспортируем клиент Apollo Client для использования в приложении
export default client;
