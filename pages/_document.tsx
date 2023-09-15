import { Html, Head, Main, NextScript } from "next/document";
// eslint-disable-next-line
import Script from "next/script";
import { config } from "../meta.config";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link
          rel="preload"
          href="/fonts/inter-v11-latin-regular.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/inter-v11-latin-900.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />

        <meta name="application-name" content={config.appName} />
        <meta name="theme-color" content={config.themeColor} />

        {/* <meta name="twitter:card" content="summary_large_image" key="twcard" /> */}
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
        <Script id="setcolormode" strategy="beforeInteractive">
          {blockingSetInitialColorMode}
        </Script>
      </body>
    </Html>
  );
}

// function needs to be a string
const blockingSetInitialColorMode = `(function() {
	${setInitialColorMode.toString()}
	setInitialColorMode();
})()
`;

function setInitialColorMode() {
  function getInitialColorMode() {
    const persistedColorPreference = window.localStorage.getItem("theme");
    const hasPersistedPreference = typeof persistedColorPreference === "string";

    // If the user has explicitly chosen light or dark,
    // use it. Otherwise null.
    if (hasPersistedPreference) {
      return persistedColorPreference;
    }

    // If there is no saved preference, use a media query
    const mql = window.matchMedia("(prefers-color-scheme: dark)");
    const hasMediaQueryPreference = typeof mql.matches === "boolean";

    if (hasMediaQueryPreference) {
      return mql.matches ? "dark" : "light";
    }

    // default to 'dark'.
    return "dark";
  }

  const colorMode = getInitialColorMode();
  const root = document.documentElement;
  root.style.setProperty("--initial-color-mode", colorMode);

  // add HTML attribute if dark mode
  if (colorMode === "dark")
    document.documentElement.setAttribute("data-theme", "dark");
}
