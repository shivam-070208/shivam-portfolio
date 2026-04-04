import Heading from "@/components/ui/heading";
import Container from "@/components/common/container";
import SubHeading from "@/components/ui/sub-heading";
import Avatar from "@/components/ui/avatar";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { File, Send } from "lucide-react";
import { SocialIconStack } from "@/components/common/social-icon-stack";
import { resumeUrl } from "@/config/constants";

const Heroic = () => {
  return (
    <section className="mt-14">
      <Container className="flex flex-wrap-reverse justify-between gap-2">
        <div>
          <Heading
            size="4xl"
            className="text-shadow-neutral-600 text-shadow-xs dark:text-neutral-300">
            Shivam Gupta
          </Heading>
          <SubHeading size="md" className="mt-3">
            Passionate Full Stack Developer focused on delivering <br />
            high-performance, scalable applications, with a strong emphasis on
            clean code.
          </SubHeading>
        </div>
        <Avatar tooltip={true} tooltipTitle="Shivam Gupta">
          <Image src="/logo.png" width={120} height={120} alt="Shivam Gupta" />
        </Avatar>
      </Container>
      <Container className="mt-6 space-x-3">
        <Button
          asChild
          className={cn(
            "bg-linear-to-br from-blue-400 to-blue-800",
            "group relative text-white",
            "shadow-xl"
          )}>
          <Link href={"#contact"}>
            <Send className="absolute left-2 transition-all group-hover:left-18" />
            <p className="ml-4 transition-all group-hover:mr-4 group-hover:ml-0">
              Contact Me
            </p>
          </Link>
        </Button>
        <Button asChild variant={"outline"} className="group relative">
          <Link href={resumeUrl} target="_blank">
            <File className="absolute left-2 transition-all group-hover:left-18" />
            <p className="ml-4 transition-all group-hover:mr-4 group-hover:ml-0">
              My Resume
            </p>
          </Link>
        </Button>
        <SocialIconStack />
      </Container>
    </section>
  );
};

export default Heroic;
