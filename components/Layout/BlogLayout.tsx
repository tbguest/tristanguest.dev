import React from "react";
import { DarkMode, Footer } from "..";
import styles from "./Layout.module.css";

const BlogLayout = ({ children }) => {
  return (
    <div className={styles.container}>
      <DarkMode />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default BlogLayout;
