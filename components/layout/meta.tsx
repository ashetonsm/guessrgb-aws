import Head from 'next/head';

export const defaultMetaProps = {
  title: 'guessRGB - A color guessing game',
  description:
    'Guess the color in 5 tries. Discover and share your favorite colors!',
  ogImage: `%PUBLIC_URL%/logo512.png`,
  ogUrl: 'https://ashetonsm.github.io/guessRGB/'
};

export default function Meta() {
  return (
    <Head>
      <title>{defaultMetaProps.title}</title>
      <link rel="icon" href="/favicon.ico" />
      <link rel="shortcut icon" type="image/x-icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" sizes="180x180" href="/favicon.ico" />
      <meta name="theme-color" content="#ffffff" />

      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />

      <meta itemProp="name" content={defaultMetaProps.title} />
      <meta itemProp="description" content={defaultMetaProps.description} />
      <meta itemProp="image" content={defaultMetaProps.ogImage} />
      <meta name="description" content={defaultMetaProps.description} />
      <meta property="og:title" content={defaultMetaProps.title} />
      <meta property="og:description" content={defaultMetaProps.description} />
      <meta property="og:url" content={defaultMetaProps.ogUrl} />
      <meta property="og:image" content={defaultMetaProps.ogImage} />
      <meta property="og:type" content="website" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@AshetonSM" />
      <meta name="twitter:creator" content="@AshetonSM" />
      <meta name="twitter:title" content={defaultMetaProps.title} />
      <meta name="twitter:description" content={defaultMetaProps.description} />
      <meta name="twitter:image" content={defaultMetaProps.ogImage} />
    </Head>
  );
}
