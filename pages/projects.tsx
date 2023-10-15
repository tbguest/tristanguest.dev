import { CardGrid } from "../components/CardGrid/CardGrid";

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
  {
    title: "Dev Portfolio",
    description:
      "My personal landing page and portfolio site, built with TypeScript and Next.js. A place where I can try new things and share projects I've worked on. It includes a blog page leveraging MDX, though this component isn't live yet.",
    image: {
      url: "/assets/projects-tristanguest.png",
      alt: "Thumbnail view of the author's dev portfolio landing page",
    },
    tags: ["React", "Next.js", "MDX"],
    link: {
      url: "https://tristanguest.dev/",
      github: "https://github.com/tbguest/tristanguest.dev/",
    },
  },
  {
    title: "Freelance Work",
    description:
      "I occasionally take on freelance projects. The linked page is a recent Next.js project built for an entrepreneur in the health and wellness field. All the site's content is served from a Prismic CMS and managed by the client.",
    image: {
      url: "/assets/projects-coaching.png",
      alt: "Thumbnail view of a coaching business page built for a client",
    },
    tags: ["Next.js", "Prismic"],
    link: {
      url: "https://wildoceancoaching.ca/",
      github: "https://github.com/tbguest/wildoceancoaching/",
    },
  },
];

export type Project = (typeof projects)[0];

export default function ProjectsPage() {
  return (
    <div>
      <h1 style={{ fontWeight: 800 }}>Projects</h1>
      <CardGrid data={projects} />
    </div>
  );
}
