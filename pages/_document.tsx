import { Head, Html, Main, NextScript } from "next/document";
import { config } from "../meta.config";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta name="application-name" content={config.appName} />
        <meta name="theme-color" content={config.themeColor} />

        <meta name="twitter:card" content="summary" key="twcard" />
        <meta name="twitter:url" content={config.domain} />
        <meta name="twitter:title" content={config.appShortName} />
        <meta name="twitter:description" content={config.description} />
        <meta
          name="twitter:image"
          content={`${config.domain}/assets/lunaOceans.png`}
        />
        <meta
          name="twitter:creator"
          content={config.twitterHandle}
          key="twhandle"
        />
        <meta name="twitter:site" content={config.twitterHandle} />

        <meta property="og:type" content="website" />
        <meta property="og:title" content={config.domain} key="ogtitle" />
        <meta
          property="og:description"
          content={config.description}
          key="ogdesc"
        />
        <meta
          property="og:site_name"
          content={config.appName}
          key="ogsitename"
        />
        <meta property="og:url" content={config.domain} key="ogurl" />
        <meta
          property="og:image"
          content={`${config.domain}/assets/tristan.png`}
          key="ogimage"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
