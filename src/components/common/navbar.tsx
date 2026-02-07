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
import GlassSurface from "../ui/glass-surface";
import ThemeToggle from "./toggle-themes";

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
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState<boolean>(false);

  useMotionValueEvent(scrollY, "change", (progress) => {
    if (progress > 70) setIsScrolled(true);
    else setIsScrolled(false);
  });
  return (
    <Container
      maxWidth="2xl"
      className={cn(
        "sticky top-6 z-99 mt-6 h-fit p-0 transition-all",
        isScrolled && "top-10"
      )}>
      <motion.div
        initial={{
          y: -100,
        }}
        animate={{
          borderRadius: isScrolled ? ["0px", "100px", "999px"] : "0px",
          width: isScrolled ? "90%" : "100%",
          borderWidth: isScrolled ? ["0.4px", "1px"] : "0px",
          y: 0,
        }}
        transition={{
          duration: 0.7,
          ease: "backInOut",
        }}
        className={cn(
          "relative mx-auto overflow-hidden bg-transparent p-2",
          isScrolled && "[backdrop-filter:url('#displacementFilter')]"
        )}>
        <GlassSurface />
        <NavigationMenu viewport={false} className="justify-between">
          <NavigationMenuLogo>
            <NavigationMenuLink asChild>
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
                <NavigationMenuLink asChild>
                  <Link href={link.href} prefetch>
                    {link.name}
                  </Link>
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
