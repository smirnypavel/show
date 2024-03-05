import CategoryToplist from "@/components/Home/CategoryList/CategoryToplist";
import HomeSearchBar from "@/components/Home/HomeSearchBar";
import HomeTopBanner from "@/components/Home/HomeTopBanner/HomeTopBanner";
import RequestForm from "@/components/Home/RequestForm";
import RequestInfo from "@/components/Home/RequestInfo";
import TopArtistsRedesign from "@/components/Home/TopContainer/TopArtistsRedesign";
import TopContainer from "@/components/Home/TopContainer/TopContainer";
import { TbHandClick } from "react-icons/tb";

// import MetaTags from "@/components/Meta/MetaTags";
import styles from "@/styles/Home/Home.module.css";

import Head from "next/head";
// import Hero from "@/components/Home/Hero";

const Home = () => {
  return (
    <>
      <Head>
        <title>Wechirka | Головна</title>
      </Head>
      <div className={styles.homepage}>
        <HomeSearchBar />
        {/* <Hero /> */}
        <HomeTopBanner />
        <div className={styles.container}>
          <CategoryToplist />
          <TopArtistsRedesign />
          <div className={styles.requestFormContainer}>
            <p className={styles.title}>Новий вимір пошуку</p>
            <p className={styles.titleText}>
              Створи собі свято всього у три кліки{" "}
              <TbHandClick className={styles.iconHand} />
            </p>
            <div className={styles.requestForm}>
              <RequestForm />
              <RequestInfo />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
