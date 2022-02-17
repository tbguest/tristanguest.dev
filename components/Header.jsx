import Image from "next/image";
import styles from "./Header.module.css";
import profile from "../public/profile.png";

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.photo_container}>
        <Image src={profile} alt="Profile photo" width={220} height={220} />
      </div>
      <h1 className={styles.title}>Tristan Guest</h1>
      {/* <nav className={styles.navbar}>
        <a className={styles.navlink} href={"/"}>
          Home
        </a>
        <a className={styles.navlink} href={"/projects"}>
          Projects
        </a>
        <a className={styles.navlink} href={"/posts"}>
          Posts
        </a>
      </nav> */}
      <p className={styles.description}>
        I&apos;m an oceanographer and software developer. I think about waves,
        currents, and tides, and I enjoy building web-friendly pipelines for
        data. I also like building front-end web experiences using React.
      </p>
    </header>
  );
}
