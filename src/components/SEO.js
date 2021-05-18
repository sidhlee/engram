import { Helmet } from 'react-helmet-async';
import previewImg from '../images/preview.png';

function SEO({ title }) {
  return (
    <Helmet>
      {/* Open Graph */}
      <title>{title}</title>
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://engram.netlify.app/login" />
      <meta property="og:title" content="Engram" />
      <meta name="image" property="og:image" content={previewImg} />
      <meta
        property="og:description"
        content="Personal tracking system for online learning resources"
      />
      <meta property="og:site_name" content="Engram" />
      <meta name="author" content="Sid H. Lee" />
      {/*  Next tags are optional but recommended  */}
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="627" />

      {/* Twitter cards */}
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:site" content="@sidhlee" />
      <meta name="twitter:creator" content="Sid Hayoun Lee" />
      <meta name="twitter:url" content="https://engram.netlify.app/login" />
      <meta name="twitter:title" content="Engram" />
      <meta
        name="twitter:description"
        content="Personal tracking system for online learning resources"
      />
      <meta name="twitter:image" content={previewImg} />
    </Helmet>
  );
}

export default SEO;
