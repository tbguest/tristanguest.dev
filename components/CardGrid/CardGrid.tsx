import { ProjectCard } from "../ProjectCard/ProjectCard";
import classes from "./CardGrid.module.css";
import { Project } from "../../pages/projects";

type Props = {
  data: Project[];
};

export const CardGrid = ({ data }: Props) => {
  return (
    <div className={classes.grid}>
      {data.map((item) => (
        <ProjectCard data={item} key={item.title} />
      ))}
    </div>
  );
};
