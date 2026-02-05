import { ExperienceAccordion } from "@/components/common/experience-accordion";
import {
  SectionContainer,
  SectionContent,
  SectionHeader,
} from "@/components/common/section-layout";
import { experienceQuery } from "@/lib/wix-client";
import type { Experience } from "@/types/experience";

const Experience = async () => {
  const { items: experiences } = await experienceQuery.find();
  return (
    <SectionContainer>
      <SectionHeader
        title={"Experience"}
        description="My professional journey so far"
      />
      <SectionContent>
        {experiences.map((experience) => (
          <ExperienceAccordion
            experience={experience as Experience}
            key={experience._id}
          />
        ))}
      </SectionContent>
    </SectionContainer>
  );
};

export default Experience;
