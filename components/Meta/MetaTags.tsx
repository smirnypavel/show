import Head from "next/head";

interface MetaTagsProps {
  title: string;
  description: string;
  keywords: string;
  ogTitle?: string; // Новый параметр для метатегов Open Graph
  ogDescription?: string; // Новый параметр для метатегов Open Graph
  ogImage?: string; // Новый параметр для метатегов Open Graph
  ogUrl?: string; // Новый параметр для метатегов Open Graph
  fbApp_id?: string; // Новый параметр для метатегов Open Graph
  ogLocale?: string; // Новый параметр для метатегов Open Graph
  ogSiteName?: string; // Новый параметр для метатегов Open Graph
  ogType?: string; // Новый параметр для метатегов Open Graph
}

const MetaTags = (
  {
    // title,
    // description,
    // keywords,
    // ogTitle,
    // ogDescription,
    // ogImage,
    // ogUrl,
    // fbApp_id,
    // ogLocale,
    // ogSiteName,
    // ogType,
  }
) => {
  return (
    <div></div>
    // <Head>
    //   <title>Wechirka пошук артистів</title>
    //   <meta
    //     property="description"
    //     content="Тут Ви зможете знайти будь-якого артиста за допомогою категорій та фільтрів"
    //   />
    //   <meta
    //     property="og:title"
    //     content="Wechirka пошук артистів"
    //   />
    //   <meta
    //     property="og:description"
    //     content="Тут Ви зможете знайти будь-якого артиста за допомогою категорій та фільтрів"
    //   />
    //   <meta
    //     property="og:image"
    //     content="https://res.cloudinary.com/dciy3u6un/image/upload/v1701947849/service/paanrsds5krezvpreog0.webp"
    //   />
    //   <meta
    //     property="og:url"
    //     content="https://www.wechirka.com"
    //   />
    //   <meta
    //     property="og:type"
    //     content="website"
    //   />
    //   <meta
    //     property="fb:app_id"
    //     content="302462449359607"
    //   />
    //   <meta
    //     property="og:locale"
    //     content="uk_UA"
    //   />
    //   <meta
    //     property="og:site_name"
    //     content="Wechirka"
    //   />
    // </Head>
  );
};

export default MetaTags;
