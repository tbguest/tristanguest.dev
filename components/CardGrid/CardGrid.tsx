import { ProjectCard } from "../ProjectCard/ProjectCard";
import classes from "./CardGrid.module.css";
import { Project } from "../../pages/projects";
import Link from "next/link";

type Props = {
  data: Project[];
};

export const CardGrid = ({ data }: Props) => {
  return (
    <>
      <p>{`I build web software, front end & back end.`}</p>
      <p>{`I do most of my work with TypeScript, Node.js, and React. For heavier data needs, I use Python.`}</p>
      <p>{`I have a PhD in oceanography, specializing in coastal ocean physics and beach dynamics. I still love thinking about data, sometimes in an ocean context, but now I spend most of my time building front-end & back-end web software for startups.`}</p>

      <p>{`Here’s a selection of projects I’ve worked on recently.`}</p>

      <Link href="/resume">Resume</Link>
      <Link href="/cv">CV</Link>

      <div className={classes.grid}>
        {data.map((item) => (
          <ProjectCard data={item} key={item.title} />
        ))}
      </div>
    </>
  );
};
