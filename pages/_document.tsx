import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="ua">
      <Head>
        <meta
          property="og:title"
          content="Wechirka пошук артистів"
        />
        <meta
          property="og:description"
          content="Іноваційний підхід до пошуку людей якм працють у сфері розваг"
        />
        <meta
          property="og:image"
          content="https://res.cloudinary.com/dciy3u6un/image/upload/v1701947849/service/paanrsds5krezvpreog0.webp"
        />
        <meta
          property="og:url"
          content="https://www.wechirka.com"
        />
        <meta
          property="og:type"
          content="app"
        />{" "}
        <meta
          property="fb:app_id"
          content="302462449359607"
        />{" "}
        <meta
          property="og:locale"
          content="uk_UA"
        />{" "}
        <meta
          property="og:site_name"
          content="Wechirka"
        />{" "}
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
