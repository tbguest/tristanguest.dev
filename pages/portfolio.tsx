import classNames from "classnames";
import Link from "next/link";
import { ContentLayout } from "../components/layout/ContentLayout";
import { ProjectCard } from "../components/ProjectCard/ProjectCard";
import { spaceGrotesk } from "../fonts";

const projects = [
  {
    title: "BiggerPicture",
    description:
      "BiggerPicture is a SaaS solution for optimizing scheduling between shippers, transportation, and consignees, drastically reducing assessorial costs and delays. Backed by Y Combinator. I'm helping BiggerPicture develop their platform using React, Next.js, and full-stack TypeScript with tRPC.",
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
    ],
    link: {
      url: "https://biggerpicture.co/",
      github: "https://biggerpicture.co/",
    },
  },
  {
    title: "LunaOcean Data Platform",
    description:
      "LunaOcean consolidates real-time and forecasted wind, wave, and ocean current data in a modern map interface. I worked on this project from inception, building with TypeScript, Next.js, and a serverless backend leveraging AWS Lambda and MongoDB. The WebGL-based particle animation for visualizing currents was a particularly interesting challenge.",
    image: {
      url: "/assets/projects-luna.png",
      alt: "Thumbnail view of the LunaOcean ocean weather app, built in part by the author",
    },
    tags: ["TypeScript", "Next.js", "MapboxGL JS", "AWS", "MongoDB", "Python"],
    link: {
      url: "https://lunaocean.app/",
      github: "https://lunaocean.app/",
    },
  },
  {
    title: "Instability I/O",
    description:
      "A gallery and playground for visualizing output from process-based models on an HTML canvas. All of the animations are procedurally generated with client-side JavaScript. Vite for module bundling. No JS frameworks.",
    image: {
      url: "/assets/projects-instability-io.png",
      alt: "Thumbnail view of a page showing black and white line art",
    },
    tags: ["HTML", "CSS", "TypeScript", "HTML Canvas", "Vite"],
    link: {
      url: "https://www.instability.io/",
      github: "https://github.com/tbguest/instability-io/",
    },
  },
  {
    title: "Repo Metrics",
    description:
      "A for-fun Next.js project for comparing GitHub repositories by interest and development effort metrics. Authenticated users can curate a custom list of repos, persisted in a MongoDB database. All asynchronous state is managed with useSWR.",
    image: {
      url: "/assets/projects-github.png",
      alt: "Thumbnail view of a GitHub repo statistics project page",
    },
    tags: [
      "Next.js",
      "TypeScript",
      "SWR",
      "MongoDB",
      "Next-Auth",
      "Chart.js",
      "Tailwind CSS",
    ],
    link: {
      url: "https://repo-metrics.vercel.app/",
      github: "https://github.com/tbguest/repo-metrics/",
    },
  },
];

export type Project = (typeof projects)[0];

export default function PortfolioPage() {
  return (
    <ContentLayout title="Portfolio">
      <div>
        <section className="flex flex-col gap-8">
          <div className="flex flex-col gap-4">
            <p>
              Hi, I'm Tristan. I build web software, front end and back end. I
              do most of my work with TypeScript, Node.js, and React. For
              heavier data needs, I use Python.
            </p>

            <p>
              I have degrees in mathematics (BSc) and oceanography (PhD),
              specializing in coastal ocean physics and beach dynamics. I still
              love thinking about data, but now I spend most of my time building
              web solutions for startups.
            </p>

            <p>
              Since 2023, I've been working as a contract software engineer via{" "}
              <Link
                href="https://www.fineday.tech/"
                target="_blank"
                className="text-anchor"
              >
                Fine Day Technologies
              </Link>
              , my software development contracting and consulting company.
            </p>

            <ul className="flex flex-col gap-1 list-disc list-inside">
              <li className="">
                <Link href="/resume" target="_blank" className="text-anchor">
                  Resume
                </Link>{" "}
                - My current statement of skills and experience as a full-stack
                software developer.
              </li>
              {/* <li>
                <Link href="/resume" target="_blank" className="text-anchor">
                  CV
                </Link>{" "}
                - I'm no longer closely involved with academia, but I keep this
                up-to-date
              </li> */}
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
              Clients & Projects
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 justify-center">
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
                "Breaking Into Tech" (and Being Entrepreneurial) (2024) - I was
                invited to present to the 2024 cohort of students in the{" "}
                <Link
                  href="https://www.onenorthend.com/the-matrix-code"
                  target="_blank"
                  className="text-anchor"
                >
                  Matrix Code
                </Link>{" "}
                program at Dalhousie University. The Matrix Code is a full-stack
                software development program for African Nova Scotian students
                and students of colour.
              </li>
              <li>
                <Link
                  href="https://www.youtube.com/watch?v=E7t_dcnB6Vw&t=166s&ab_channel=Halihax"
                  target="_blank"
                  className="text-anchor"
                >
                  Client Side Data Fetching with SWR
                </Link>{" "}
                (2022) - I presented at a local front-end development meetup in
                Halifax organized by{" "}
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
                  CV
                </Link>
              </li>
            </ul>
          </div>
        </section>
      </div>
    </ContentLayout>
  );
}
