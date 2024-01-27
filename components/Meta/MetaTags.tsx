import Head from "next/head";

interface MetaTagsProps {
  title: string;
  description: string;
  keywords: string;
  ogTitle: string; // Новый параметр для метатегов Open Graph
  ogDescription: string; // Новый параметр для метатегов Open Graph
  ogImage: string; // Новый параметр для метатегов Open Graph
  ogUrl: string; // Новый параметр для метатегов Open Graph
  fbApp_id: string; // Новый параметр для метатегов Open Graph
  ogLocale: string; // Новый параметр для метатегов Open Graph
  ogSiteName: string; // Новый параметр для метатегов Open Graph
  ogType: string; // Новый параметр для метатегов Open Graph
}

const MetaTags: React.FC<MetaTagsProps> = ({
  title,
  description,
  keywords,
  ogTitle,
  ogDescription,
  ogImage,
  ogUrl,
  fbApp_id,
  ogLocale,
  ogSiteName,
  ogType,
}) => {
  return (
    <Head>
      <title>{title}</title>
      <meta
        name="description"
        content={description}
      />
      <meta
        name="keywords"
        content={keywords}
      />
      <meta
        property="og:title"
        content={ogTitle}
      />
      <meta
        property="og:description"
        content={ogDescription}
      />
      <meta
        property="og:image"
        content={ogImage}
      />
      <meta
        property="og:url"
        content={ogUrl}
      />
      <meta
        property="og:type"
        content={ogType}
      />
      <meta
        property="fb:app_id"
        content={fbApp_id}
      />
      <meta
        property="og:locale"
        content={ogLocale}
      />
      <meta
        property="og:site_name"
        content={ogSiteName}
      />
    </Head>
  );
};

export default MetaTags;
