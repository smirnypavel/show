import HomeSearchBar from "@/components/Home/HomeSearchBar";
import HomeTopBanner from "@/components/Home/HomeTopBanner/HomeTopBanner";
import RequestForm from "@/components/Home/RequestForm";
import TopContainer from "@/components/Home/TopContainer/TopContainer";

import MetaTags from "@/components/Meta/MetaTags";
import styles from "@/styles/Home/Home.module.css";
import Head from "next/head";

const Home = () => {
  return (
    <>
      <Head>
        {" "}
        <meta
          property="og:title"
          content="Wechirka пошук артистів"
        />
        <meta
          property="og:description"
          content="Іноваційний підхід до пошуку людей які працють у сфері розваг"
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
          content="website"
        />
        <meta
          property="fb:app_id"
          content="302462449359607"
        />
        <meta
          property="og:locale"
          content="uk_UA"
        />
        <meta
          property="og:site_name"
          content="Wechirka"
        />
      </Head>
      <MetaTags
        title={"Wechirka пошук артистів"}
        description={
          "Іноваційний підхід до пошуку людей які працють у сфері розваг"
        }
        keywords={""}
      />
      <div className={styles.homepage}>
        <HomeSearchBar />
        <HomeTopBanner />
        <div className={styles.container}>
          <div className={styles.requestForm}>
            <RequestForm />
          </div>
          <TopContainer />
        </div>
      </div>
    </>
  );
};

export default Home;
