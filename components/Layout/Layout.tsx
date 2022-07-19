import React from "react";
import { Navbar, Footer } from "..";
import styles from "./Layout.module.css";

const Layout = ({ children }) => {
  return (
    <div className={styles.container}>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
