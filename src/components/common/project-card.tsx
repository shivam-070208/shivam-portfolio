
import { ProjectType } from "@/types/project"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"
import { cn, linktoWixImageLink } from "@/lib/utils"

import {
    FaReact,
    FaNodeJs,
    FaGithub,
    FaCss3Alt,
    FaJsSquare,
    FaSass,
    FaAngular,
    FaVuejs,
    FaJava,
    FaDocker
} from "react-icons/fa";
import {
    SiNextdotjs,
    SiTailwindcss,
    SiMongodb,
    SiRedux,
    SiExpress,
    SiVercel,
    SiFirebase,
    SiCplusplus,
    SiGo,
    SiRuby,
    SiRust,
    SiPostgresql,
    SiMysql,
    SiJest,
    SiDotnet,
    SiDjango,
    SiFlask,
    SiGraphql,
    SiPrisma,
    SiThreedotjs
} from "react-icons/si";
import Avatar from "../ui/avatar";

const TechNologyIconMap: Record<string, { icon: React.ElementType; color?: string }> = {
    react: { icon: FaReact, color: "#61DAFB" },
    nextjs: { icon: SiNextdotjs, color: "#000" },
    tailwind: { icon: SiTailwindcss, color: "#38BDF8" },
    "tailwindcss": { icon: SiTailwindcss, color: "#38BDF8" },
    nodejs: { icon: FaNodeJs, color: "#339933" },
    github: { icon: FaGithub, color: "#000" },
    css: { icon: FaCss3Alt, color: "#1572B6" },
    javascript: { icon: FaJsSquare, color: "#F7DF1E" },
    mongodb: { icon: SiMongodb, color: "#47A248" },
    redux: { icon: SiRedux, color: "#764ABC" },
    express: { icon: SiExpress, color: "#000" },
    vercel: { icon: SiVercel, color: "#000" },
    firebase: { icon: SiFirebase, color: "#FFCA28" },
    cplusplus: { icon: SiCplusplus, color: "#00599C" },
    go: { icon: SiGo, color: "#00ADD8" },
    ruby: { icon: SiRuby, color: "#CC342D" },
    rust: { icon: SiRust, color: "#000" },
    postgresql: { icon: SiPostgresql, color: "#336791" },
    mysql: { icon: SiMysql, color: "#4479A1" },
    jest: { icon: SiJest, color: "#C21325" },
    angular: { icon: FaAngular, color: "#DD0031" },
    vue: { icon: FaVuejs, color: "#42b883" },
    sass: { icon: FaSass, color: "#CC6699" },
    dotnet: { icon: SiDotnet, color: "#512BD4" },
    django: { icon: SiDjango, color: "#092E20" },
    flask: { icon: SiFlask, color: "#000" },
    graphql: { icon: SiGraphql, color: "#E10098" },
    prisma: { icon: SiPrisma, color: "#2D3748" },
    docker: { icon: FaDocker, color: "#2496ED" },
    java: { icon: FaJava, color: "#007396" },
    react3fiber: { icon: SiThreedotjs, color: "#000" }
};


const GradientClassesMap: string[] = [
    "bg-linear-to-b from-blue-500 via-indigo-600 to-red-500",
    "bg-linear-to-br from-purple-500 via-pink-500 to-orange-500",
    "bg-linear-to-r from-green-400 via-blue-500 to-purple-600",
    "bg-linear-to-tr from-yellow-400 via-pink-500 to-red-500",
    "bg-linear-to-bl from-teal-400 via-cyan-500 to-blue-500",
];

const ProjectCard = ({
    project
}: {
    project: ProjectType
}) => {
    return (
        <Card className="pt-0!">
            <div className={cn("p-2 rounded-t-xl",
                GradientClassesMap[project.id % GradientClassesMap.length]
            )}>
                <Image
                    src={linktoWixImageLink(project.image)}
                    alt={project.title}
                    width={500}
                    height={400}
                    className=" object-cover rounded-xl"
                />
            </div>
            <CardHeader>
                <CardTitle>
                    {project.title}
                </CardTitle>
                <CardDescription className="line-clamp-3">
                    {project.description}
                </CardDescription>
            </CardHeader>
            <CardFooter className="flex justify-between ">
                <div className="flex " >
                    {project.tech.map((tech, idx) => {
                        const Icon = TechNologyIconMap[tech]?.icon;
                        return (
                            <Avatar
                                className="group flex items-center  overflow-hidden outline transition-all duration-300"
                                tooltip={false}
                                key={idx}
                            >
                                {Icon && <Icon className="transition-transform duration-300 group-hover:scale-110" color={TechNologyIconMap[tech]?.color} />}
                                <span
                                    className="text-xs ml-0 max-w-0 opacity-0 group-hover:ml-2 group-hover:mr-2 group-hover:max-w-xs group-hover:opacity-100 transition-[max-width,opacity,margin] duration-300 whitespace-nowrap"
                                >
                                    {tech.charAt(0).toUpperCase() + tech.slice(1)}
                                </span>
                            </Avatar>
                        );
                    })}
                </div>
            </CardFooter>
        </Card>
    )
}

export {
    ProjectCard
}