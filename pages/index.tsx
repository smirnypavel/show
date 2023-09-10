import HomeChat from "@/components/Home/HomeChat";
import RequestForm from "@/components/Home/RequestForm";
import TopContainer from "@/components/Home/TopContainer";
import styles from "@/styles/Home/Home.module.css";

const Home = () => {
  return (
    <div className={styles.homepage}>
      <div>Home</div>
      <div className={styles.container}>
        <HomeChat />
        <div>
          <TopContainer />
          <RequestForm />
        </div>
      </div>
    </div>
  );
};

export default Home;
