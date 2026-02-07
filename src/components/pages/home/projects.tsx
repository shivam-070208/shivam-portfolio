import { ProjectCard } from "@/components/common/project-card";
import {
  SectionContainer,
  SectionContent,
  SectionHeader,
} from "@/components/common/section-layout";
import { projectsQuery } from "@/lib/wix-client";
import { Project } from "@/types/project";
const Projects = async () => {
  const { items: allProjects } = await projectsQuery.find();

  return (
    <SectionContainer id="projects">
      <SectionHeader
        title="My work"
        description="I love to build experience with feature"
      />
      <SectionContent>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          {allProjects.length === 0 && <div>No projects found.</div>}
          {allProjects.map((project) => (
            <ProjectCard project={project as Project} key={project._id} />
          ))}
        </div>
      </SectionContent>
    </SectionContainer>
  );
};

export default Projects;
