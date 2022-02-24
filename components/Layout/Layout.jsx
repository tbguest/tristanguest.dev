import React from "react";
import { DarkMode, Footer } from "../../components";
import styles from "./Layout.module.css";

const Layout = ({ children }) => {
  return (
    <div className={styles.container}>
      <DarkMode />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
