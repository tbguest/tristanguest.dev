import { Space_Grotesk } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { FaArrowRightLong } from "react-icons/fa6";
import profile from "../../public/wizard-sprite.png";
import styles from "./Profile.module.css";

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"] });

const content = [
  {
    id: "1",
    title: "Why is there a Gulf Stream?",
    intro:
      "Exploring the reasons for western intensification in ocean gyre circulation using first principles and WebGL",
  },
  {
    id: "2",
    title: "Simple models of physical systems",
    intro: "Visualizing complex physical phenomena with simple models",
  },
  {
    id: "3",
    title: "Client-side data fetching",
    intro: "Stale-while-revalidate as a caching strategy",
  },
  {
    id: "4",
    title: "On becoming a better storyteller",
    intro:
      "Lessons learned about being a better communicator from a classic introvert",
  },
];

export default function Home() {
  return (
    <>
      <div className={styles.header}>
        <div className={styles.profile_image_container}>
          <Image
            src={profile}
            alt="A pixel art wizard offering a floating laptop"
            width={192}
            height={224}
            priority={true}
            unoptimized
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
            {`I’m a full-stack web developer, data scientist, and builder. `}
          </p>
          <div style={{ display: "flex" }}>
            <Link
              href="/projects"
              // className={spaceGrotesk.className}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                // padding: "0.5rem 1rem",
                // fontSize: "0.8rem",
                textDecoration: "none",
                cursor: "pointer",
                color: "#416494",
                // color: "#3B81F6",
              }}
            >
              {/* Dev portfolio <FaArrowRightLong /> */}
              Go to my portfolio <FaArrowRightLong />
              {/* <FaArrowRightLong />Go to my portfolio */}
            </Link>
          </div>
        </section>
      </div>

      <TightContent />
      {/* <SpacedContent /> */}
    </>
  );
}

const TightContent = () => {
  return (
    <>
      <h2
        className={spaceGrotesk.className}
        style={{
          marginBottom: 16,
          marginTop: 36,
          fontSize: "1.2rem",
        }}
      >
        Writing & code
      </h2>
      <ul
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 4,
          marginBottom: 36,
          padding: 0,
          listStylePosition: "inside",
          listStyleType: "none",
        }}
      >
        {content.map((item) => {
          return (
            <li key={item.id}>
              <Link
                href="/projects"
                style={{ marginBottom: 0, color: "#416494" }}
                // style={{ marginBottom: 0, color: "#3B81F6" }}
              >
                {item.title}
              </Link>
              <p style={{ marginTop: 0, fontSize: "0.9rem", color: "grey" }}>
                {item.intro}
              </p>
            </li>
          );
        })}
      </ul>
    </>
  );
};

const SpacedContent = () => {
  return (
    <section
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 32,
        marginTop: 36,
        marginBottom: 36,
      }}
    >
      {content.map((item) => {
        return (
          <div
            key={item.id}
            style={{
              borderLeft: "solid",
              borderColor: "#D6E6FE",
              // borderColor: "#072557",
              borderWidth: 3,
              padding: "0 12px 0 12px",
            }}
          >
            <h3 className={spaceGrotesk.className}>{item.title}</h3>
            <p style={{ marginBottom: 0 }}>{item.intro}</p>
          </div>
        );
      })}
    </section>
  );
};
