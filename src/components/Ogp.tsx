import Head from "next/head";
import React from "react";

type OgpProps = {
  url?: string
  type: 'website' | 'blog' | 'article' | 'product'
  title?: string
  description?: string
}

const Ogp: React.FC<OgpProps> = ({ url, type, title, description }) => {
  return (
    <Head>
      <meta property="og:url" content={url} />
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:site_name" content="アイムケーのブログ" />
      <meta property="og:image" content={process.env.OGP_ENDPOINT + "/ogp_dog.JPG"} />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:site" content="@IamK_prog" />
      <meta property="twitter:image" content={process.env.OGP_ENDPOINT + "/ogp_dog.JPG"} />
    </Head>
  );
}

export default Ogp;
