import React from "react";
import { DarkMode, Footer } from "..";
import styles from "./Layout.module.css";

type Props = {
  children: React.ReactNode;
};

const BlogLayout: React.FC<Props> = ({ children }) => {
  return (
    <div className={styles.container}>
      <DarkMode />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default BlogLayout;
