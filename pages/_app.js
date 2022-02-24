import "../styles/globals.css";
import { ThemeProvider } from "next-themes";
import { Layout } from "../components";

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider enableSystem={false}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  );
}

export default MyApp;
