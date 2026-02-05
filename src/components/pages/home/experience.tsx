import {
  SectionContainer,
  SectionContent,
  SectionHeader,
} from "@/components/common/section-layout";
import { Briefcase } from "lucide-react";

const experiences = [
  {
    company: "Acme Corp",
    position: "Senior Full Stack Developer",
    duration: "2022 - Present",
    description: [
      "Led development on enterprise-scale SaaS platforms using React, Next.js, and Node.js.",
      "Architected distributed systems to improve reliability and speed.",
      "Mentored a team of 5 developers and conducted code reviews.",
    ],
    tech: ["React", "Next.js", "Node.js", "TypeScript", "PostgreSQL"],
  },
  {
    company: "Globex Solutions",
    position: "Frontend Developer",
    duration: "2020 - 2022",
    description: [
      "Developed responsive UIs for B2B applications with React & TailwindCSS.",
      "Collaborated with UX team to enhance accessibility across products.",
      "Implemented CI/CD pipelines for faster delivery.",
    ],
    tech: ["React", "TailwindCSS", "Jest", "Vercel"],
  },
  {
    company: "Soylent Tech",
    position: "Software Engineering Intern",
    duration: "2019 - 2020",
    description: [
      "Assisted in the migration of legacy apps to modern stack.",
      "Wrote automated tests and improved backend API response times.",
      "Drove an intern project that won internal hackathon.",
    ],
    tech: ["Node.js", "Express", "MongoDB"],
  },
];

const Experience = () => {
  return (
    <SectionContainer>
      <SectionHeader
        title={"Experience"}
        description="My professional journey so far"
      />
      <SectionContent>
        <ul className="space-y-8">
          {experiences.map((exp, idx) => (
            <li
              key={idx}
              className="relative border-l-4 border-blue-200 pb-2 pl-5">
              <span className="text-lg font-semibold text-neutral-900 dark:text-neutral-50">
                {exp.position}
              </span>
              <span className="mt-1 block text-base font-medium text-blue-700 dark:text-blue-300">
                {exp.company}
              </span>
              <span className="block text-sm text-neutral-500 dark:text-neutral-300">
                {exp.duration}
              </span>
              <ul className="mt-2 ml-5 list-disc text-[15px] text-neutral-700 dark:text-neutral-200">
                {exp.description.map((d, i) => (
                  <li key={i}>{d}</li>
                ))}
              </ul>
              <div className="mt-2 flex flex-wrap gap-2">
                {exp.tech.map((t, i) => (
                  <span
                    key={i}
                    className="rounded bg-blue-100 px-2 py-1 text-xs font-medium text-blue-700 dark:bg-blue-900 dark:text-blue-100">
                    {t}
                  </span>
                ))}
              </div>
            </li>
          ))}
        </ul>
      </SectionContent>
    </SectionContainer>
  );
};

export default Experience;
