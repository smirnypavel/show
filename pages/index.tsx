import CategoryToplist from "@/components/Home/CategoryList/CategoryToplist";
import HomeSearchBar from "@/components/Home/HomeSearchBar";
import HomeTopBanner from "@/components/Home/HomeTopBanner/HomeTopBanner";
import RequestForm from "@/components/Home/RequestForm";
import TopArtistsRedesign from "@/components/Home/TopContainer/TopArtistsRedesign";
import TopContainer from "@/components/Home/TopContainer/TopContainer";

// import MetaTags from "@/components/Meta/MetaTags";
import styles from "@/styles/Home/Home.module.css";
import { Metadata } from "next";
import Head from "next/head";
export const metadata: Metadata = {
  title: "Time Line",
};
const Home = () => {
  return (
    <>
      <Head>
        <title>Wechirka | Головна</title>
      </Head>
      <div className={styles.homepage}>
        <HomeSearchBar />
        <HomeTopBanner />
        {/* <div className={styles.container}>
          <div className={styles.requestForm}>
            <RequestForm />
          </div>
          <TopContainer />
        </div> */}

        <div className={styles.container}>
          {" "}
          <CategoryToplist />
          <TopArtistsRedesign />
        </div>
      </div>
    </>
  );
};

export default Home;
