import {
  SectionContainer,
  SectionContent,
  SectionHeader,
} from "@/components/common/section-layout";
import Heading from "@/components/ui/heading";

const About = () => {
  return (
    <SectionContainer>
      <SectionHeader title="Me" description="About me " />
      <SectionContent>
        <Heading className="text-shadow-2xs dark:text-shadow-neutral-300">
          Shivam Gupta
        </Heading>
      </SectionContent>
    </SectionContainer>
  );
};

export default About;
