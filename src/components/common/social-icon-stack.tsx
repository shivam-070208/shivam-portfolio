import { linkedinUrl, xUrl, eMail, githubUrl } from "@/config/constants";
import Avatar from "@/components/ui/avatar";
import { IconsMap } from "@/lib/iconMap";
import Link from "next/link";
import { mailtoUrl } from "@/lib/utils";

const SocialData = [
  {
    name: "X",
    href: xUrl,
    iconKey: "x",
  },
  {
    name: "Linkedin",
    href: linkedinUrl,
    iconKey: "linkedin",
  },
  {
    name: "Github",
    href: githubUrl,
    iconKey: "github",
  },
  {
    name: "Email",
    href: mailtoUrl(eMail),
    iconKey: "mail",
  },
];

const SocialIconStack = () => {
  return (
    <div className="flex gap-1 mt-4">
      {SocialData.map((social) => {
        const IconComponent = IconsMap[social.name];
        return (
          <Link
            href={social.href}
            key={social.name}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Avatar
              tooltip
              tooltipTitle={social.name}
              className="p-2 rounded-md border"
            >
              {IconComponent && <IconComponent  size={24} />}
            </Avatar>
          </Link>
        );
      })}
    </div>
  );
};

export default SocialIconStack;