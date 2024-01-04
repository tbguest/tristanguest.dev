import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Inter } from "next/font/google";
import { Layout } from "../components/Layout";

const inter = Inter({ subsets: ["latin"] });

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <main className={inter.className}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </main>
  );
}

export default MyApp;
