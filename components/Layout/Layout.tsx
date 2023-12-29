import { Navbar, Footer } from "..";
import styles from "./Layout.module.css";
import Head from "next/head";

type Props = {
  children: React.ReactNode;
};

const Layout: React.FC<Props> = ({ children }) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Tristan Guest</title>
        <meta property="og:title" content={`Tristan Guest`} key="title" />
        <meta
          name="description"
          content="I'm a software developer working on the Atlantic coast of Canada. I value simplicity and usability in software, and I like building with full-stack tools. I think modern JavaScript is up there with the bicycle as a benchmark of human ingenuity."
          key="desc"
        />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
