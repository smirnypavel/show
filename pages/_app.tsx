// import "../styles/globals.css";

import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { store, persistor } from "../redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { restoreToken } from "../redux/auth/authOperations";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import Layout from "@/components/Layout/Layout";

import "../styles/globals.css"; // Путь к вашему файлу globals.css

function MyApp({ Component, pageProps }: AppProps) {
  // Остальной код без изменений
  useEffect(() => {
    restoreToken();
  }, []);
  return (
    <Provider store={store}>
      <PersistGate
        loading={null}
        persistor={persistor}>
        <Toaster />
        <Layout>
          <div className="container">
            <Component {...pageProps} />
          </div>
          {/* Компонент переключения темы */}
        </Layout>
      </PersistGate>
    </Provider>
  );
}

export default MyApp;
