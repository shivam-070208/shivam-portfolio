import {
  LinkedinIcon,
  XIcon,
  GithubIcon,
  MailIcon,
  TwitterIcon,
  GlobeIcon,
  type LucideIcon,
} from "lucide-react";
import React from "react";
import { SiCodio } from "react-icons/si";

export const IconsMap: Record<string, LucideIcon | React.ElementType> = {
  X: XIcon,
  Linkedin: LinkedinIcon,
  Github: GithubIcon,
  Email: MailIcon,
  Twitter: TwitterIcon,
  Website: GlobeIcon,
  Codolio: SiCodio,
};
