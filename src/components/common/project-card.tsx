import type { Project } from "@/types/project";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { cn, linktoWixImageLink } from "@/lib/utils";

import {
  FaReact,
  FaNodeJs,
  FaGithub,
  FaSass,
  FaJava,
  FaDocker,
  FaExternalLinkAlt,
} from "react-icons/fa";
import {
  SiNextdotjs,
  SiTailwindcss,
  SiMongodb,
  SiRedux,
  SiExpress,
  SiVercel,
  SiFirebase,
  SiGo,
  SiPostgresql,
  SiMysql,
  SiJest,
  SiDotnet,
  SiDjango,
  SiFlask,
  SiGraphql,
  SiPrisma,
  SiThreedotjs,
  SiGnubash,
  SiVite,
} from "react-icons/si";
import Avatar from "../ui/avatar";
import Link from "next/link";

const TechNologyIconMap: Record<
  string,
  { icon: React.ElementType; color?: string }
> = {
  react: { icon: FaReact, color: "#61DAFB" },
  nextjs: { icon: SiNextdotjs, color: "#000" },
  tailwind: { icon: SiTailwindcss, color: "#38BDF8" },
  tailwindcss: { icon: SiTailwindcss, color: "#38BDF8" },
  nodejs: { icon: FaNodeJs, color: "#339933" },
  mongodb: { icon: SiMongodb, color: "#47A248" },
  redux: { icon: SiRedux, color: "#764ABC" },
  express: { icon: SiExpress, color: "#000" },
  vercel: { icon: SiVercel, color: "#000" },
  firebase: { icon: SiFirebase, color: "#FFCA28" },
  go: { icon: SiGo, color: "#00ADD8" },
  postgresql: { icon: SiPostgresql, color: "#336791" },
  mysql: { icon: SiMysql, color: "#4479A1" },
  jest: { icon: SiJest, color: "#C21325" },
  sass: { icon: FaSass, color: "#CC6699" },
  dotnet: { icon: SiDotnet, color: "#512BD4" },
  django: { icon: SiDjango, color: "#092E20" },
  flask: { icon: SiFlask, color: "#000" },
  graphql: { icon: SiGraphql, color: "#E10098" },
  prisma: { icon: SiPrisma, color: "#2D3748" },
  docker: { icon: FaDocker, color: "#2496ED" },
  java: { icon: FaJava, color: "#007396" },
  react3fiber: { icon: SiThreedotjs, color: "#000" },
  vite: { icon: SiVite, color: "#646CFF" },
  glsl: { icon: SiGnubash, color: "#5E5FA6" }, // Substitute, since no GLSL icon in react-icons
  threejs: { icon: SiThreedotjs, color: "#000" },
};

const GradientClassesMap: string[] = [
  "bg-linear-to-b from-blue-500 via-indigo-600 to-red-500",
  "bg-linear-to-br from-purple-500 via-pink-500 to-orange-500",
  "bg-linear-to-r from-green-400 via-blue-500 to-purple-600",
  "bg-linear-to-tr from-yellow-400 via-pink-500 to-red-500",
  "bg-linear-to-bl from-teal-400 via-cyan-500 to-blue-500",
];

const ProjectCard = ({ project }: { project: Project }) => {
  return (
    <Card className="wobbly-md overflow-hidden pt-0!">
      <div
        className={cn(
          "group rounded-t-xl p-4",
          GradientClassesMap[project.id % GradientClassesMap.length]
        )}>
        <Image
          src={linktoWixImageLink(project.image)}
          alt={project.title}
          width={500}
          height={400}
          className="wobbly object-cover transition-all group-hover:scale-110"
        />
      </div>
      <CardHeader>
        <CardTitle>{project.title}</CardTitle>
        <CardDescription className="line-clamp-3">
          {project.description}
        </CardDescription>
      </CardHeader>
      <CardFooter className="flex items-center justify-between">
        <div className="flex">
          {project.tech.map((tech, idx) => {
            const Icon = TechNologyIconMap[tech]?.icon;
            return (
              <Avatar
                className="group outline-foreground flex items-center overflow-hidden outline transition-all duration-300 outline-dashed dark:backdrop-contrast-60"
                tooltip={false}
                isWobbled={false}
                key={idx}>
                {Icon && (
                  <Icon
                    className="transition-transform duration-300 group-hover:scale-110"
                    color={TechNologyIconMap[tech]?.color}
                  />
                )}
                <span className="ml-0 max-w-0 text-xs whitespace-nowrap opacity-0 transition-[max-width,opacity,margin] duration-300 group-hover:mx-2 group-hover:max-w-xs group-hover:opacity-100">
                  {tech.charAt(0).toUpperCase() + tech.slice(1)}
                </span>
              </Avatar>
            );
          })}
        </div>
        <div className="flex items-center gap-2">
          {project.github && (
            <Link
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub repository"
              className="transition-colors hover:text-black dark:hover:text-white">
              <FaGithub size={20} />
            </Link>
          )}
          {project.live && (
            <Link
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Live site"
              className="transition-colors hover:text-blue-700 dark:hover:text-blue-400">
              <FaExternalLinkAlt size={18} />
            </Link>
          )}
        </div>
      </CardFooter>
    </Card>
  );
};

export { ProjectCard };
