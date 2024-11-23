import Image from "next/image";
import { Card } from "../Card/Card";
import { TbExternalLink } from "react-icons/tb";
import classes from "./ProjectCard.module.css";
import Link from "next/link";
import { Project } from "../../pages/projects";
import { Space_Grotesk } from "next/font/google";
import classNames from "classnames";

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"] });

type Props = {
  data: Project;
};

export const ProjectCard = ({ data }: Props) => {
  return (
    <div style={{ maxWidth: 600, alignSelf: "center" }}>
      <Card style={{ padding: 0 }}>
        <div className={classes.image_wrapper}>
          <Image
            src={data.image.url}
            alt={data.image.alt}
            layout="fill"
            className={classes.image}
          />
        </div>
        <div className={classes.link_container}>
          <Link
            href={data.link.url}
            passHref={true}
            target="_blank"
            className={classes.link}
          >
            <TbExternalLink className={classes.icon} />
          </Link>
        </div>
        <div className={classes.content_wrapper}>
          <Link href={data.link.github} passHref={true} target="_blank">
            <h2 className={spaceGrotesk.className}>{data.title}</h2>
          </Link>
          <p>{data.description}</p>
          <span className={classes.tags_wrapper}>
            {data.tags.map((tag) => (
              <small
                className={classNames([classes.tag, spaceGrotesk.className])}
                key={tag}
              >
                {tag}
              </small>
            ))}
          </span>
        </div>
      </Card>
    </div>
  );
};
