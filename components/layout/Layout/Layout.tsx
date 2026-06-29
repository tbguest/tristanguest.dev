import Head from "next/head";
import { PropsWithChildren } from "react";
import { Footer } from "../../Footer";
import { SiteNav } from "../SiteNav";

const SITE_NAME = "Tristan Guest";
const DEFAULT_DESCRIPTION =
  "I'm a software developer working on the Atlantic coast of Canada. I value simplicity and usability in software, and I like building with full-stack tools.";

interface LayoutProps {
  title?: string;
  description?: string;
}

export const Layout = ({
  children,
  title,
  description,
}: PropsWithChildren<LayoutProps>) => {
  const pageTitle = title ?? SITE_NAME;
  const pageDescription = description ?? DEFAULT_DESCRIPTION;

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta property="og:title" content={pageTitle} key="title" />
        <meta name="description" content={pageDescription} key="desc" />
        <meta
          property="og:description"
          content={pageDescription}
          key="ogdesc"
        />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <main className="min-h-screen top-0 px-8 py-7 mx-auto relative max-w-[800px] flex flex-col justify-between">
        <div>
          {/* <SiteNav /> */}
          {children}
        </div>
        <Footer />
      </main>
    </>
  );
};
