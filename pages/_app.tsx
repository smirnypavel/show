// import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Analytics } from "@vercel/analytics/react";
import { Inter } from "next/font/google";
import { Provider } from "react-redux";
import { store, persistor } from "../redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { restoreToken } from "../redux/auth/authOperations";
import { ClassAttributes, JSX, MetaHTMLAttributes, useEffect } from "react";
import { Toaster } from "react-hot-toast";
import Layout from "@/components/Layout/Layout";
const inter = Inter({ weight: ["400", "500"], subsets: ["latin"] });
import "../styles/globals.css"; // Путь к вашему файлу globals.css
import Head from "next/head";

function MyApp({ Component, pageProps }: AppProps) {
  // console.log("pageProps", pageProps);
  let title = pageProps.title ? pageProps.title : "Default metatags ";
  let description = pageProps.description
    ? pageProps.description
    : "Default description";
  // Остальной код без изменений
  useEffect(() => {
    restoreToken();
  }, []);
  return (
    <Provider store={store}>
      <Head>
        <meta
          property="title"
          content={title}
          key="title"
        />
        <meta
          property="description"
          content={description}
          key="description"
        />
      </Head>
      <PersistGate
        loading={null}
        persistor={persistor}>
        <Toaster />
        <Layout>
          <main className={`container ${inter.className}`}>
            <Component {...pageProps} />
            <Analytics />
          </main>
          {/* Компонент переключения темы */}
        </Layout>
      </PersistGate>
    </Provider>
  );
}

export default MyApp;
