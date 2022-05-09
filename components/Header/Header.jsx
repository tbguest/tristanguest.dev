import Image from "next/image";
import styles from "./Header.module.css";
import profile from "../../public/profile.png";

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.profile_image_container}>
        <Image
          src={profile}
          alt="Photo of the author"
          width={180}
          height={180}
          priority={true}
          className={styles.profile_image}
        />
      </div>
      <h1 className={styles.title}>Tristan Guest</h1>
    </header>
  );
};

export default Header;
