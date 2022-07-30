import { DarkMode } from "..";
import styles from "./Navbar.module.css";
import Link from "next/link";

const Navbar = () => {
  return (
    <>
      <nav className={styles.nav_container}>
        <Link href={"/"}>
          <a className={styles.nav_link}>Home</a>
        </Link>
        {/* <Link href={"/blog"}>
          <a className={styles.nav_link}>Blog</a>
        </Link> */}
        <Link href={"/projects"}>
          <a className={styles.nav_link}>Projects</a>
        </Link>
        <DarkMode />
      </nav>
    </>
  );
};

export default Navbar;
