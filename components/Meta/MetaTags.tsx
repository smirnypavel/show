import Head from "next/head";

interface MetaTagsProps {
  title: string;
  description: string;
  keywords: string;
}

const MetaTags: React.FC<MetaTagsProps> = ({
  title,
  description,
  keywords,
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
      {/* Дополнительные метатеги, которые вы хотите добавить */}
    </Head>
  );
};

export default MetaTags;
