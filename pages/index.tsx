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
        title={"Wechirka пошук артистів"}
        description={
          "Іноваційний підхід до пошуку людей які працють у сфері розваг"
        }
        keywords={""}
        ogTitle={"Wechirka пошук артистів"}
        ogDescription={
          "Іноваційний підхід до пошуку людей які працють у сфері розваг"
        }
        ogImage={
          "https://res.cloudinary.com/dciy3u6un/image/upload/v1701947849/service/paanrsds5krezvpreog0.webp"
        }
        ogUrl={"https://www.wechirka.com"}
        fbApp_id={"302462449359607"}
        ogLocale={"uk_UA"}
        ogSiteName={"Wechirka"}
        ogType={"website"}
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
