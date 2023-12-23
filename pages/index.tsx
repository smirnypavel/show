import HomeSearchBar from "@/components/Home/HomeSearchBar";
import HomeTopBanner from "@/components/Home/HomeTopBanner/HomeTopBanner";
import RequestForm from "@/components/Home/RequestForm";
import TopContainer from "@/components/Home/TopContainer/TopContainer";
import MetaTags from "@/components/Meta/MetaTags";
import styles from "@/styles/Home/Home.module.css";

const Home = () => {
  // Установите соответствующие значения для метатегов Open Graph
  // const ogTitle = "Wechirka пошук артистів";
  // const ogDescription =
  //   "Іноваційний підхід до пошуку людей якм працють у сфері розваг";
  // const ogImage =
  //   "https://res.cloudinary.com/dciy3u6un/image/upload/v1701947849/service/paanrsds5krezvpreog0.webp";
  // const ogUrl = "https://show-swart.vercel.app/"; // Установите URL вашей страницы

  return (
    <>
      <MetaTags
        title="Wechirka | Головна"
        description="Пошук артистів"
        keywords=""
        ogTitle="Wechirka пошук артистів"
        ogDescription="Іноваційний підхід до пошуку людей якм працють у сфері розваг"
        ogImage="https://res.cloudinary.com/dciy3u6un/image/upload/v1701947849/service/paanrsds5krezvpreog0.webp"
        ogUrl="https://show-swart.vercel.app/"
      />
      <div className={styles.homepage}>
        <HomeSearchBar />
        <HomeTopBanner />
        <div className={styles.container}>
          <RequestForm />
          <TopContainer />
        </div>
      </div>
    </>
  );
};

export default Home;
