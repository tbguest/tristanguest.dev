import { Space_Grotesk } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { FaArrowRightLong } from "react-icons/fa6";
import profile from "../../public/wizard-sprite.png";
import classNames from "classnames";

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

export function Home() {
  return (
    <>
      <div className="flex flex-row items-center gap-8">
        {/* <div className="flex flex-col"> */}
        <Image
          src={profile}
          alt="A pixel art wizard offering a floating laptop"
          width={192}
          height={224}
          priority={true}
          unoptimized
        />

        <section>
          <h1
            className={classNames([
              spaceGrotesk.className,
              "font-black text-3xl mb-2",
            ])}
          >
            Tristan Guest
          </h1>
          <p className={"mb-4"}>
            {`I’m a full-stack web developer, data scientist, and builder. `}
          </p>
          <Link
            href="/projects"
            className="flex items-center gap-1 text-anchor"
          >
            Go to my portfolio <FaArrowRightLong />
          </Link>
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
        className={classNames([
          spaceGrotesk.className,
          "mb-4 mt-9 font-semibold text-xl",
        ])}
      >
        Writing & Code
      </h2>
      <ul className="flex flex-col gap-4 mb-9">
        {content.map((item) => {
          return (
            <li key={item.id}>
              <Link href="/projects" className="mb-0 text-anchor">
                {item.title}
              </Link>
              <p className="mt-0.5 text-sm text-gray-500">{item.intro}</p>
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
