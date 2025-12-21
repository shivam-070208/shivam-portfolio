import Heading from "@/components/ui/heading";
import Container from "@/components/common/container";
import SubHeading from "@/components/ui/sub-heading";
import Avatar from "@/components/ui/avatar";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { File, Send } from "lucide-react";
import SocialIconStack from "@/components/common/social-icon-stack";

const Heroic = () => {
  return (
    <div className="mt-14">
      <Container className="flex justify-between gap-2 flex-wrap-reverse">
        <div>
          <Heading
            size="4xl"
            className="text-shadow-xs  text-shadow-neutral-600 dark:text-neutral-300"
          >
            Shivam Gupta
          </Heading>
          <SubHeading size="md" className=" mt-3">
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
            "text-white group relative ",
            "shadow-md shadow-neutral-600 dark:shadow-neutral-700"
          )}
        >
          <Link href={"/contact"}>
            <Send className="transition-all absolute left-2 group-hover:left-22" />
            <p className="ml-4 transition-all group-hover:mr-4 group-hover:ml-0">
              Contact Me
            </p>
          </Link>
        </Button>
        <Button asChild variant={"outline"} className="relative group ">
          <Link href={"#"} target="_blank">
            <File className="transition-all absolute left-2 group-hover:left-22" />
            <p className="ml-4 transition-all group-hover:mr-4 group-hover:ml-0">
              My Resume
            </p>
          </Link>
        </Button>
        <SocialIconStack />
      </Container>
    </div>
  );
};

export default Heroic;
