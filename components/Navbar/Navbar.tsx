import { DarkMode } from "..";
import styles from "./Navbar.module.css";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className={styles.nav_container}>
      <Link href={"/"} className={styles.nav_link}>
        Home
      </Link>
      <Link href={"/projects"} className={styles.nav_link}>
        Work
      </Link>
      <DarkMode />
    </nav>
  );
};

export default Navbar;
