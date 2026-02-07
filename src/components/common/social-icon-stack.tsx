import {
  linkedinUrl,
  xUrl,
  eMail,
  githubUrl,
  codolioUrl,
} from "@/config/constants";
import Avatar from "@/components/ui/avatar";
import { IconsMap } from "@/lib/icon-map";
import Link from "next/link";
import { mailtoUrl } from "@/lib/utils";

interface SocialDataType {
  name: keyof typeof IconsMap;
  href: string;
}
const SocialData: Array<SocialDataType> = [
  {
    name: "X",
    href: xUrl,
  },
  {
    name: "Linkedin",
    href: linkedinUrl,
  },
  {
    name: "Github",
    href: githubUrl,
  },
  {
    name: "Email",
    href: mailtoUrl(eMail),
  },
  {
    name: "Codolio",
    href: codolioUrl,
  },
];

const SocialIconStack = () => {
  return (
    <div className="mt-4 flex gap-1">
      {SocialData.map((social) => {
        const IconComponent = IconsMap[social.name];
        return (
          <Link
            href={social.href}
            key={social.name}
            target="_blank"
            rel="noopener noreferrer">
            <Avatar
              tooltip
              tooltipTitle={social.name}
              className="rounded-md border p-2">
              {IconComponent && <IconComponent size={24} />}
            </Avatar>
          </Link>
        );
      })}
    </div>
  );
};

export { SocialIconStack };
