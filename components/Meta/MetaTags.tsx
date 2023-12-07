import Head from "next/head";

interface MetaTagsProps {
  title: string;
  description: string;
  keywords: string;
  ogTitle?: string; // Новый параметр для метатегов Open Graph
  ogDescription?: string; // Новый параметр для метатегов Open Graph
  ogImage?: string; // Новый параметр для метатегов Open Graph
  ogUrl?: string; // Новый параметр для метатегов Open Graph
}

const MetaTags: React.FC<MetaTagsProps> = ({
  title,
  description,
  keywords,
  ogTitle,
  ogDescription,
  ogImage,
  ogUrl,
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
      {/* Метатеги Open Graph */}
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
    </Head>
  );
};

export default MetaTags;
