import Image from "next/image";
import Link from "next/link";
import { FaArrowRightLong } from "react-icons/fa6";
import profile from "../../public/wizard-sprite.png";
import classNames from "classnames";
import { spaceGrotesk } from "../../fonts";
// import { Breadcrumb } from "../Breadcrumb";
import { Layout } from "../layout/Layout/Layout";

const content = [
  {
    id: "1",
    href: "/content/simple-models",
    title: "Simple models of physical systems",
    intro: "Recreating complex physical phenomena with simple models",
  },
  {
    id: "2",
    href: "/content/gulf-stream",
    title: "Why is there a Gulf Stream?",
    intro: "Fun with geophysical fluid dynamics (and your GPU)",
  },
  // {
  //   id: "3",
  //   title: "Client-side data fetching",
  //   intro: "Stale-while-revalidate as a caching strategy",
  // },
  // {
  //   id: "4",
  //   href: "/content/storytelling",
  //   title: "On becoming a better storyteller",
  //   intro:
  //     "Lessons learned about being a better communicator from a classic introvert",
  // },
  // {
  //   id: "5",
  //   href: "/content/gists",
  //   title: "Gists",
  //   intro: "Code snippets I might want to reuse",
  // },
];

export function Home() {
  return (
    <Layout>
      <div className="flex flex-row items-center gap-8 lg:mt-6 xl:mt-8 2xl:mt-12">
        <div className="flex flex-col">
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
              {`I'm a full-stack web developer, data scientist, and builder. I like connecting with people.`}
            </p>
            <Link
              href="/portfolio"
              className="flex items-center gap-1 text-anchor"
            >
              Go to my portfolio <FaArrowRightLong />
            </Link>
          </section>
        </div>
      </div>

      <TightContent />
    </Layout>
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
              <Link href={item.href} className="mb-0 text-anchor">
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
