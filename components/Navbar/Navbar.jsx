import { DarkMode } from "..";
import styles from "./Navbar.module.css";

const Navbar = () => {
  return (
    <>
      <nav className={styles.nav_container}>
        <a className={styles.nav_link} href={"/"}>
          Home
        </a>
        <a className={styles.nav_link} href={"/blog"}>
          Blog
        </a>
        <DarkMode />
      </nav>
    </>
  );
};

export default Navbar;
