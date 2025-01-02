import Image from "next/image";
import { TbExternalLink } from "react-icons/tb";
import Link from "next/link";
import { Project } from "../../pages/portfolio";
import classNames from "classnames";
import { spaceGrotesk } from "../../fonts";

type Props = {
  data: Project;
};

export const ProjectCard = ({ data }: Props) => {
  return (
    <div className="relative rounded-lg flex flex-col shadow-lg">
      <div className="relative w-full h-[200px]">
        <Image
          src={data.image.url}
          alt={data.image.alt}
          fill
          className="object-cover rounded-tr-lg rounded-tl-lg"
        />
      </div>
      <div className="absolute top-2 right-2 w-6 h-6">
        <Link
          href={data.link.url}
          passHref={true}
          target="_blank"
          className="w-full h-full"
        >
          <TbExternalLink className="w-full h-full text-white bg-inherit opacity-80 drop-shadow-[0px_0px_3px_rgba(0,0,0,0.9)]" />
        </Link>
      </div>
      <div className="p-4 flex flex-col gap-2">
        <Link href={data.link.github} passHref={true} target="_blank">
          <h2
            className={classNames([
              spaceGrotesk.className,
              "my-3 font-semibold text-xl",
            ])}
          >
            {data.title}
          </h2>
        </Link>
        <p>{data.description}</p>
        <span className="flex flex-wrap p-2">
          {data.tags.map((tag, index) => (
            <small
              className={classNames([
                "text-black flex items-center",
                spaceGrotesk.className,
              ])}
              key={tag}
            >
              {index > 0 && (
                <span className="w-1 h-1 bg-black rounded-full mx-2" />
              )}
              {tag}
            </small>
          ))}
        </span>
      </div>
    </div>
  );
};
