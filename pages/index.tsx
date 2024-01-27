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
