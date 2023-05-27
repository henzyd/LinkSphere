import { Helmet } from "react-helmet";

interface SeoProps {
  title: string;
  description: string;
}

const Seo: React.FC<SeoProps> = ({ title, description }) => {
  return (
    <Helmet>
      <title>LinkSphere — {title}</title>
      <meta name="title" content={`Title — ${title}`} />
      <meta name="description" content={description} />

      {/* <meta property="og:type" content="website" />
        <meta property="og:url" content="https://Defi.com/" />
        <meta property="og:title" content={`Defi — ${title}`} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={image} />

        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://Defi.com/" />
        <meta property="twitter:title" content={`Defi — ${title}`} />
        <meta property="twitter:description" content={description} />
        <meta property="twitter:image" content={image} /> */}
    </Helmet>
  );
};

export default Seo;
