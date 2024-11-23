import Link from "next/link";
import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <Link href="https://github.com/tbguest" target="blank">
        github
      </Link>
      <Link href="https://www.linkedin.com/in/tristanguest/" target="blank">
        linkedin
      </Link>
      <Link href="https://x.com/tristan_guest" target="blank">
        x
      </Link>
    </footer>
  );
};

export default Footer;
