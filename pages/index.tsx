import HomeSearchBar from "@/components/Home/HomeSearchBar";
import HomeTopBanner from "@/components/Home/HomeTopBanner/HomeTopBanner";
import RequestForm from "@/components/Home/RequestForm";
import TopContainer from "@/components/Home/TopContainer/TopContainer";
import styles from "@/styles/Home/Home.module.css";

const Home = () => {
  return (
    <div className={styles.homepage}>
      <HomeSearchBar />
      <HomeTopBanner />
      <div className={styles.container}>
        <RequestForm />
        <TopContainer />
      </div>
    </div>
  );
};

export default Home;
