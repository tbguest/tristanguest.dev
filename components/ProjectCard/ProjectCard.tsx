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
    <div className="relative rounded-lg flex flex-col md:flex-row shadow-lg overflow-hidden">
      <div className="relative w-full md:w-2/5 md:min-w-[300px] aspect-[16/9]">
        <Image
          src={data.image.url}
          alt={data.image.alt}
          fill
          className="object-cover rounded-tl-lg rounded-tr-lg md:rounded-tr-none md:rounded-bl-lg"
        />
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
      </div>
      <div className="p-6 flex flex-col gap-3 flex-1">
        <Link href={data.link.url} passHref={true} target="_blank">
          <h2
            className={classNames([
              spaceGrotesk.className,
              "font-semibold text-xl",
            ])}
          >
            {data.title}
          </h2>
        </Link>
        <p className="flex-1">{data.description}</p>
        <span className="flex flex-wrap gap-2">
          {data.tags.map((tag) => (
            <small
              className={classNames([
                "text-black flex items-center",
                spaceGrotesk.className,
              ])}
              key={tag}
            >
              {tag}
            </small>
          ))}
        </span>
      </div>
    </div>
  );
};
