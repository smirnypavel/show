// import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Analytics } from "@vercel/analytics/react";
import { Comfortaa } from "next/font/google";
import { Provider } from "react-redux";
import { store, persistor } from "../redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { restoreToken } from "../redux/auth/authOperations";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import Layout from "@/components/Layout/Layout";
const inter = Comfortaa({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});
import "../styles/globals.css"; // Путь к вашему файлу globals.css
import Head from "next/head";

function MyApp({ Component, pageProps }: AppProps) {
  let title = pageProps.artist
    ? pageProps.artist
    : "Wechirka - новий вимір сворення свята";
  let description = pageProps.artist
    ? pageProps.artist
    : "Тут Ви зможете знайти будь-якого артиста або людину що працює у сфері розваг)))";
  let image = pageProps.artist
    ? pageProps.artist
    : "https://res.cloudinary.com/dciy3u6un/image/upload/v1701947849/service/paanrsds5krezvpreog0.webp";
  // // Остальной код без изменений
  useEffect(() => {
    restoreToken();
  }, []);
  return (
    <Provider store={store}>
      <Head>
        <meta
          property="title"
          content={title.title || "Wechirka - новий вимір сворення свята"}
          key="title"
        />
        <meta
          property="description"
          content={
            description.description ||
            "Тут Ви зможете знайти будь-якого артиста або людину що працює у сфері розваг)))"
          }
          key="description"
        />
        <meta
          property="og:title"
          content={title.title || "Wechirka - новий вимір сворення свята"}
          key="title"
        />
        <meta
          property="og:description"
          content={
            description.description ||
            "Тут Ви зможете знайти будь-якого артиста або людину що працює у сфері розваг)))"
          }
          key="description"
        />
        <meta
          property="og:image"
          content={
            image.metaUrl ||
            "https://res.cloudinary.com/dciy3u6un/image/upload/v1701947849/service/paanrsds5krezvpreog0.webp"
          }
          key="ogimage"
        />
        <meta
          property="og:url"
          content="https://www.wechirka.com/artists/65ea49a15e6bbb81c4e175a7"
          key="ogurl"
        />
        <meta
          property="og:type"
          content="website"
          key="ogtype"
        />
        <meta
          property="fb:app_id"
          content="302462449359607"
          key="fbappid"
        />
        <meta
          property="og:locale"
          content="uk_UA"
          key="oglocale"
        />
        <meta
          property="og:site_name"
          content="Wechirka"
          key="ogsitename"
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
        </Layout>
      </PersistGate>
    </Provider>
  );
}

export default MyApp;
