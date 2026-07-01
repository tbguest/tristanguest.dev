export type Project = {
  title: string;
  description: string;
  summary?: string;
  role?: string;
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

export const projects: Project[] = [
  {
    title: "BiggerPicture",
    description:
      "Full-stack contract engineer on YC-backed BiggerPicture, a freight appointment network that gives carriers, shippers, and facilities a single shared record instead of three disconnected tools. Building across the stack with React, Next.js, TypeScript, and tRPC.",
    summary:
      "YC-backed freight appointment network giving carriers, shippers, and facilities one shared scheduling record.",
    role: "Full-stack contract engineer",
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
    title: "LunaOcean Data Platform",
    description:
      "Full-stack engineer from project inception on LunaOcean, a platform consolidating real-time and forecasted wind, wave, and ocean current data. Worked on the Next.js front end, serverless AWS Lambda backend, and MongoDB data layer — including WebGL particle animations for current visualization.",
    summary:
      "Real-time ocean weather platform with WebGL particle visualizations of waves, wind, and currents.",
    role: "Founding full-stack engineer",
    image: {
      url: "/assets/projects-luna.png",
      alt: "Thumbnail view of the LunaOcean ocean weather app, built in part by the author",
    },
    tags: ["TypeScript", "Next.js", "MapboxGL JS", "AWS", "MongoDB", "Python"],
    link: {
      url: "https://lunaocean.app/",
    },
  },
  {
    title: "Freewheeling Adventures",
    description:
      "Contract engineer modernizing operational software for Freewheeling Adventures, a global adventure travel company with nearly 40 years in business. Migrating a legacy MS Access database to MySQL and rebuilding internal tools with TypeScript and React.",
    summary:
      "Modernizing operational software for a 40-year-old adventure-travel company; legacy Access → MySQL.",
    role: "Contract engineer",
    image: {
      url: "/assets/projects-freewheeling.jpg",
      alt: "Thumbnail view of a tourism webpage showing a colorful and dynamic landscape",
    },
    tags: ["MySQL", "TypeScript", "React.js", "MS Access"],
    link: {
      url: "https://www.freewheeling.ca",
    },
  },
];

export const writing: Project[] = [
  {
    title: "Simple models of physical systems",
    description:
      "Interactive article with live simulations. Explores windblown sand ripples and dune cellular automata with canvas demos alongside scientific writing.",
    image: {
      url: "/assets/content/ripples.gif",
      alt: "Animation of windblown sand ripples from the Simple Models article",
    },
    tags: ["HTML5 Canvas", "TypeScript", "React"],
    link: {
      url: "/content/simple-models",
    },
  },
  {
    title: "Why is there a Gulf Stream?",
    description:
      "Fun with geophysical fluid dynamics (and your GPU). An interactive visualization of the North Atlantic gyre and wind-driven circulation models.",
    image: {
      url: "/assets/content/north-atlantic-cropped.png",
      alt: "Cropped map of the North Atlantic used in the Gulf Stream article",
    },
    tags: ["WebGL", "TypeScript", "Fluid dynamics"],
    link: {
      url: "/content/gulf-stream",
    },
  },
];
