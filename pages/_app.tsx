import "../styles/globals.css";
import { ThemeProvider } from "next-themes";
import { Layout } from "../components";
import type { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    // <ThemeProvider enableSystem={false}>
    <Layout>
      <Component {...pageProps} />
    </Layout>
    // </ThemeProvider>
  );
}

export default MyApp;
