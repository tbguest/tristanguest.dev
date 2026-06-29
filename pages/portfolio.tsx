import classNames from "classnames";
import Link from "next/link";
import { ContentLayout } from "../components/layout/ContentLayout";
import { ProjectCard } from "../components/ProjectCard/ProjectCard";
import { spaceGrotesk } from "../fonts";

export type Project = {
  title: string;
  description: string;
  image: {
    url: string;
    alt: string;
  };
  tags: string[];
  link: {
    url: string;
    github?: string;
  };
};

const projects: Project[] = [
  {
    title: "BiggerPicture",
    description:
      "Full-stack contract engineer on YC-backed BiggerPicture, a SaaS platform that optimizes scheduling between shippers, carriers, and consignees. Building across the stack with React, Next.js, TypeScript, and tRPC.",
    image: {
      url: "/assets/projects-biggerpicture.png",
      alt: "Thumbnail view of the BiggerPicture landing page",
    },
    tags: [
      "TypeScript",
      "React.js",
      "Node.js",
      "tRPC",
      "Prisma",
      "Planetscale",
      "MySQL",
      "LLMs",
    ],
    link: {
      url: "https://biggerpicture.co/",
    },
  },
  {
    title: "Freewheeling Adventures",
    description:
      "Contract engineer modernizing operational software for Freewheeling Adventures, a global adventure travel company with nearly 40 years in business. Migrating a legacy MS Access database to MySQL and rebuilding internal tools with TypeScript and React.",
    image: {
      url: "/assets/projects-freewheeling.jpg",
      alt: "Thumbnail view of a tourism webpage showing a colorful and dynamic landscape",
    },
    tags: ["MySQL", "TypeScript", "React.js", "MS Access"],
    link: {
      url: "https://www.freewheeling.ca",
    },
  },
  {
    title: "LunaOcean Data Platform",
    description:
      "Full-stack engineer from project inception on LunaOcean, a platform consolidating real-time and forecasted wind, wave, and ocean current data. Worked on the Next.js front end, serverless AWS Lambda backend, and MongoDB data layer — including WebGL particle animations for current visualization.",
    image: {
      url: "/assets/projects-luna.png",
      alt: "Thumbnail view of the LunaOcean ocean weather app, built in part by the author",
    },
    tags: ["TypeScript", "Next.js", "MapboxGL JS", "AWS", "MongoDB", "Python"],
    link: {
      url: "https://lunaocean.app/",
    },
  },
];

export default function PortfolioPage() {
  return (
    <ContentLayout
      title="Portfolio"
      description="Projects, conference talks, and background — full-stack developer working with YC-backed startup and ocean data platforms."
    >
      <div>
        <section className="flex flex-col gap-8">
          <div className="flex flex-col gap-4">
            <p>
              {`Hi, I'm Tristan. I build web software, front end and back end. I
              do most of my work with TypeScript, Node.js, and React. For
              heavier data needs, I use Python.`}
            </p>

            <p>
              {`I have degrees in mathematics (BSc) and oceanography (PhD),
              specializing in coastal ocean physics and beach dynamics. I still
              love thinking about data, but now I spend most of my time building
              web solutions for startups.`}
            </p>

            <p>
              {`Since 2023, I've been working as a contract software engineer via `}
              <Link
                href="https://www.fineday.tech/"
                target="_blank"
                className="text-anchor"
              >
                Fine Day Technologies
              </Link>
              {`, my contracting and consulting company.`}
            </p>

            <p>
              <Link href="/resume" target="_blank" className="text-anchor">
                Here's my resume.
              </Link>
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <h2
              className={classNames([
                spaceGrotesk.className,
                "font-black text-2xl mb-1",
                "group flex items-center gap-2",
              ])}
            >
              Recent Clients & Projects
            </h2>
            <div className="flex flex-col gap-8">
              {projects.map((item) => (
                <ProjectCard data={item} key={item.title} />
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <h2
              className={classNames([
                spaceGrotesk.className,
                "font-black text-2xl mb-1",
                "group flex items-center gap-2",
              ])}
            >
              Talks
            </h2>
            <ul className="flex flex-col gap-1 list-disc list-inside">
              <li>
                {`"Breaking Into Tech" (and Being Entrepreneurial) (2024) - I was
                invited to present to the 2024 cohort of students in the `}
                <Link
                  href="https://www.onenorthend.com/the-matrix-code"
                  target="_blank"
                  className="text-anchor"
                >
                  Matrix Code
                </Link>
                {` program at Dalhousie University. The Matrix Code is a full-stack
                software development program for African Nova Scotian students
                and students of colour.`}
              </li>
              <li>
                <Link
                  href="https://www.youtube.com/watch?v=E7t_dcnB6Vw&t=166s&ab_channel=Halihax"
                  target="_blank"
                  className="text-anchor"
                >
                  Client Side Data Fetching with SWR
                </Link>
                {` (2022) - I presented at a local front-end development meetup in
                Halifax organized by `}
                <Link
                  href="https://www.meetup.com/halifax-reactjs-meetup/"
                  target="_blank"
                  className="text-anchor"
                >
                  HFX.js
                </Link>{" "}
                and the{" "}
                <Link
                  href="https://www.halihax.com/"
                  target="_blank"
                  className="text-anchor"
                >
                  Halihax
                </Link>{" "}
                software development community. See the{" "}
                <Link
                  href="https://github.com/tbguest/swr-examples"
                  target="_blank"
                  className="text-anchor"
                >
                  accompanying app on GitHub
                </Link>
                .
              </li>
              <li>
                See{" "}
                <Link href="/cv" target="_blank" className="text-anchor">
                  my CV
                </Link>{" "}
                for a full list of academic talks
              </li>
            </ul>
          </div>

          <div className="flex flex-col gap-2">
            <h2
              className={classNames([
                spaceGrotesk.className,
                "font-black text-2xl mb-1",
                "group flex items-center gap-2",
              ])}
            >
              Publications
            </h2>
            <ul className="flex flex-col gap-1 list-disc list-inside">
              <li>
                <Link
                  href="https://scholar.google.ca/citations?user=ebCRoxkAAAAJ&hl=en&oi=sra"
                  target="_blank"
                  className="text-anchor"
                >
                  Google Scholar
                </Link>
              </li>
              <li>
                <Link
                  href="https://www.researchgate.net/profile/Tristan-Guest"
                  target="_blank"
                  className="text-anchor"
                >
                  ResearchGate
                </Link>
              </li>
              <li>
                <Link href="/cv" target="_blank" className="text-anchor">
                  CV (academic)
                </Link>
              </li>
            </ul>
          </div>
        </section>
      </div>
    </ContentLayout>
  );
}
