import { ReactElement } from "react";
import { Project } from "../../models";
import { ProjectCard } from "../ProjectCard/ProjectCard";
import classes from "./CardGrid.module.css";

type CardGridProps = {
  data: Project[];
};

export const CardGrid = ({ data }: CardGridProps): ReactElement => {
  return (
    <div className={classes.grid}>
      {data.map((item) => (
        <ProjectCard data={item} key={String(item.title)} />
      ))}
    </div>
  );
};
