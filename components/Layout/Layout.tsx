import Head from "next/head";
import Hero from "../Hero/Hero";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import classes from "./Layout.module.css";
import { PropsWithChildren } from "react";

export const Layout = ({ children }: PropsWithChildren) => {
  return (
    <>
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
      <main>
        <Hero />
        <div className={classes.layout}>
          <Navbar />
          {children}
          <Footer />
        </div>
      </main>
    </>
  );
};
