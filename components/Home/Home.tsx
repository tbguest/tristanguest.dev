import Image from "next/image";
import Link from "next/link";
import { FaArrowRightLong } from "react-icons/fa6";
import profile from "../../public/wizard-sprite.png";
import classNames from "classnames";
import { spaceGrotesk } from "../../fonts";
import { Layout } from "../layout/Layout/Layout";
import { projects, Project } from "../../data/projects";

const featured = projects.slice(0, 2);

export function Home() {
  return (
    <Layout>
      <div className="flex flex-row items-center gap-8 lg:mt-6 xl:mt-8 2xl:mt-12">
        <div className="flex flex-col">
          <div className="group relative w-fit">
            <Image
              src={profile}
              alt="A pixel art wizard offering a floating laptop"
              width={192}
              height={224}
              priority={true}
              unoptimized
            />
            <span
              role="tooltip"
              className={classNames([
                "pointer-events-none absolute left-1/2 bottom-full z-10 mb-1.5 w-max max-w-[13rem]",
                "-translate-x-1/2 translate-y-0.5 rounded px-2 py-1",
                "border border-gray-200 bg-white/90 text-[11px] leading-snug text-gray-500 text-center",
                "opacity-0 transition-all duration-300 ease-out",
                "group-hover:translate-y-0 group-hover:opacity-100",
              ])}
            >
              {`It's a wizard. I like fantasy.`}
            </span>
          </div>

          <section>
            <h1
              className={classNames([
                spaceGrotesk.className,
                "font-black text-3xl mb-2",
              ])}
            >
              Tristan Guest
            </h1>
            <p>
              {`Full-stack developer (TypeScript, React, Node). Contract software engineer for startups and SMBs. PhD in oceanography.`}
            </p>
          </section>
        </div>
      </div>

      <SelectedWork />
    </Layout>
  );
}

const SelectedWork = () => {
  return (
    <>
      <h2
        id="work"
        className={classNames([
          spaceGrotesk.className,
          "mb-4 mt-9 font-semibold text-xl",
        ])}
      >
        Selected work
      </h2>
      <ul className="flex flex-col gap-4">
        {featured.map((project) => (
          <li key={project.title}>
            <WorkCard project={project} />
          </li>
        ))}
      </ul>

      <Link
        href="/portfolio"
        className={classNames([
          "group mt-4 flex items-center justify-between gap-3 rounded-lg px-5 py-4",
          "border border-gray-200 bg-gray-50/60",
          "transition-all hover:border-gray-300 hover:bg-gray-50",
        ])}
      >
        <span className="flex flex-col">
          <span
            className={classNames([
              spaceGrotesk.className,
              "font-semibold text-base",
            ])}
          >
            See my full portfolio
          </span>
          <span className="text-sm text-gray-500">
            More projects, talks, writing, and background
          </span>
        </span>
        <FaArrowRightLong className="shrink-0 text-anchor transition-transform group-hover:translate-x-1" />
      </Link>
    </>
  );
};

const WorkCard = ({ project }: { project: Project }) => {
  const isInternal = project.link.url.startsWith("/");
  return (
    <Link
      href={project.link.url}
      {...(isInternal ? {} : { target: "_blank" })}
      className={classNames([
        "group flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white sm:flex-row",
        "transition-all hover:border-gray-300 hover:shadow-md",
      ])}
    >
      <div className="relative aspect-[16/9] w-full shrink-0 sm:aspect-auto sm:w-44 sm:self-stretch">
        <Image
          src={project.image.url}
          alt={project.image.alt}
          fill
          className="object-cover"
        />
      </div>
      <div className="flex min-w-0 flex-1 flex-col gap-1.5 p-4">
        <div className="flex items-center gap-1.5">
          <h3
            className={classNames([
              spaceGrotesk.className,
              "font-semibold text-base",
            ])}
          >
            {project.title}
          </h3>
          <FaArrowRightLong className="text-gray-400 opacity-0 -translate-x-1 transition-all group-hover:opacity-100 group-hover:translate-x-0" />
        </div>
        {project.role && (
          <p
            className={classNames([
              spaceGrotesk.className,
              "text-[11px] uppercase tracking-wide text-gray-400",
            ])}
          >
            {project.role}
          </p>
        )}
        {project.summary && (
          <p className="text-sm text-gray-600">{project.summary}</p>
        )}
        <span className="mt-0.5 flex flex-wrap gap-x-2 gap-y-0.5">
          {project.tags.slice(0, 4).map((tag) => (
            <small
              key={tag}
              className={classNames([spaceGrotesk.className, "text-gray-400"])}
            >
              {tag}
            </small>
          ))}
        </span>
      </div>
    </Link>
  );
};
