import Image from "next/image";
import styles from "./Profile.module.css";
import profile from "../../public/wizard-sprite.png";
import { Space_Grotesk } from "next/font/google";
import { FaArrowRightLong } from "react-icons/fa6";
import Link from "next/link";

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"] });

export const Profile = () => {
  return (
    <div className={styles.header}>
      <div className={styles.profile_image_container}>
        <Image
          src={profile}
          alt="A pixel art wizard offering a floating laptop"
          width={192}
          height={224}
          priority={true}
        />
      </div>

      <section>
        <h1
          className={spaceGrotesk.className}
          style={{ fontWeight: 900, marginBottom: 0 }}
        >
          Tristan Guest
        </h1>
        <p className={styles.description}>
          {`I'm a software developer. Web. Front end & back end. Data.
          
          Improv, storytelling, dungeonmaster`}
        </p>
        <div style={{ display: "flex" }}>
          <Link
            href="/projects"
            className={spaceGrotesk.className}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              padding: "0.5rem 1rem",
              fontSize: "0.8rem",
              backgroundColor: "white",
              border: "2px solid #413556",
              textDecoration: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Go to my portfolio <FaArrowRightLong />
          </Link>
        </div>
      </section>
    </div>
  );
};
