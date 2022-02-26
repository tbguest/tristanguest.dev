import Image from "next/image";
import styles from "./Header.module.css";
import profile from "../../public/profile.png";

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.photo_container}>
        <Image src={profile} alt="Profile photo" layout="fill" />
      </div>
      <h1 className={styles.title}>Tristan Guest</h1>
    </header>
  );
};

export default Header;
