"use client";
import Image from "next/image";
import {
  NavigationMenu,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuLogo,
  NavigationMenuItem,
} from "../ui/navigation-menu";
import Container from "./container";
import Link from "next/link";
import { motion, useMotionValueEvent, useScroll } from "motion/react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import ThemeToggle from "./toggle-themes";
import GlassSurface from "../ui/glass-surface";

const NabLinks = [
  {
    name: "Projects",
    href: "#projects",
  },
  {
    name: "About",
    href: "#about",
  },
  {
    name: "Contact",
    href: "#contact",
  },
  {
    name: "Blogs",
    href: "/blogs",
  },
];
const NavBar = () => {
  const { scrollYProgress } = useScroll();
  const [isScrolled, setIsScrolled] = useState<boolean>(false);

  useMotionValueEvent(scrollYProgress, "change", (progress) => {
    if (progress > 0.1) setIsScrolled(true);
    else setIsScrolled(false);
  });
  return (
    <Container
      maxWidth="2xl"
      className={cn(
        "h-fit mt-6 sticky top-6 p-0 z-99 transition-all",
        isScrolled && "top-10"
      )}
    >
      <motion.div
        animate={{
          borderRadius: isScrolled ? ["0px", "100px", "9999px"] : "0px",
          width: isScrolled ? "90%" : "100%",
          borderWidth: isScrolled ? ["0.4px", "1px"] : "0px",
          y: [-100, 0],
        }}
        transition={{
          borderRadius: {
            duration: 0.4,
            ease: "linear",
          },
        }}
        className={cn(
          "bg-transparent transition-all relative  p-2 mx-auto",
          "[backdrop-filter:url('#displacementFilter')]"
        )}
      >
        <GlassSurface />
        <NavigationMenu viewport={false} className="justify-between">
            <NavigationMenuLogo>
            <NavigationMenuLink  asChild>
              <Link href={"/"}>
                <Image
                  src={"/logo.png"}
                  className="rounded-full"
                  alt="Shivam"
                  width={30}
                  height={30}
                />
              </Link>
            </NavigationMenuLink>
          </NavigationMenuLogo>
              <NavigationMenuList>
            {NabLinks.map((link, index) => (
              <NavigationMenuItem key={index}>
                <NavigationMenuLink  asChild >
                    <Link href={link.href}>{link.name}</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
          <ThemeToggle />
        </NavigationMenu>
      </motion.div>
    </Container>
  );
};

export default NavBar;
