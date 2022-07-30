import Image from "next/image";
import { ReactElement } from "react";
import { Project } from "../../models";
import { Card } from "../Card/Card";
import { TbExternalLink } from "react-icons/tb";
import classes from "./ProjectCard.module.css";
import Link from "next/link";

type ProjectCardProps = {
  data: Project;
};

export const ProjectCard = ({ data }: ProjectCardProps): ReactElement => {
  return (
    <>
      <Card style={{ padding: 0 }}>
        <div className={classes.image_wrapper}>
          <Image
            src={data.image.url as string}
            alt={data.image.alt as string}
            layout="fill"
            className={classes.image}
          />
        </div>
        <div className={classes.link_container}>
          <Link href={data.link.url as string} passHref={true}>
            <a
              target="_blank"
              rel="noopener noreferrer"
              className={classes.link}
            >
              <TbExternalLink className={classes.icon} />
            </a>
          </Link>
        </div>
        <div className={classes.content_wrapper}>
          <Link href={data.link.github as string} passHref={true}>
            <a target="_blank" rel="noopener noreferrer">
              <h2>{data.title}</h2>
            </a>
          </Link>
          <p>{data.description}</p>
          <span className={classes.tags_wrapper}>
            {data.tags.map((tag) => (
              <small className={classes.tag} key={String(tag)}>
                {tag}
              </small>
            ))}
          </span>
        </div>
      </Card>
    </>
  );
};
