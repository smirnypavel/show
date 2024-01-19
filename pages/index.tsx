import HomeSearchBar from "@/components/Home/HomeSearchBar";
import HomeTopBanner from "@/components/Home/HomeTopBanner/HomeTopBanner";
import RequestForm from "@/components/Home/RequestForm";
import TopContainer from "@/components/Home/TopContainer/TopContainer";

import MetaTags from "@/components/Meta/MetaTags";
import styles from "@/styles/Home/Home.module.css";

const Home = () => {
  return (
    <>
      <MetaTags
        title="Wechirka | Головна"
        description="Пошук артистів"
        keywords=""
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
