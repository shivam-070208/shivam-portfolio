import {
  SectionContainer,
  SectionContent,
  SectionHeader,
} from "@/components/common/section-layout";
import Heading from "@/components/ui/heading";
import SubHeading from "@/components/ui/sub-heading";
import Avatar from "@/components/ui/avatar";
import Image from "next/image";
import { SocialIconStack } from "@/components/common/social-icon-stack";

const About = () => {
  return (
    <SectionContainer id="about">
      <SectionHeader title="Me" description="About me" />
      <SectionContent className="flex flex-wrap gap-4">
        <Avatar tooltip={true} tooltipTitle="Shivam Gupta">
          <Image src="/logo.png" width={120} height={120} alt="Shivam Gupta" />
        </Avatar>
        <div className="flex flex-1 flex-col gap-4">
          <Heading className="text-shadow-2xs dark:text-shadow-neutral-300">
            Shivam Gupta
          </Heading>
          <SubHeading className="max-w-full!" size="md">
            I&apos;m a fullstack developer passionate about building scalable
            web apps. Currently pursuing my B.Tech at{" "}
            <strong>National Institute of Technology, Patna</strong>. I build
            scalable app with emerging UX experience.
          </SubHeading>
          <SocialIconStack />
        </div>
      </SectionContent>
    </SectionContainer>
  );
};

export default About;
