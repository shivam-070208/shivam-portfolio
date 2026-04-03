import Heroic from "@/components/pages/home/heroic";
import GitHubGraph from "@/components/pages/home/github-graph";
import Projects from "@/components/pages/home/projects";
import Container from "@/components/common/container";
import Experience from "@/components/pages/home/experience";
import About from "@/components/pages/home/about";
import Contact from "@/components/pages/home/contact";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Bitsketcher - Portfolio of Shivam Gupta",
  description:
    "Portfolio of Shivam Gupta – developer, creator, and tech enthusiast. Showcasing projects, experience, blogs, and contact information.",
  keywords: [
    "Bitsketcher",
    "Shivam Gupta",
    "Developer",
    "Web Developer",
    "Frontend",
    "Backend",
    "Full Stack",
    "React",
    "Next.js",
    "TypeScript",
    "Portfolio",
    "JavaScript",
    "UI",
    "UX",
    "TailwindCSS",
    "CSS",
    "HTML",
    "Tech Portfolio",
    "Engineer",
    "Next Generation Web",
    "Open Source",
  ],
  authors: [{ name: "Shivam Gupta" }],
  creator: "Shivam Gupta",
  publisher: "Bitsketcher",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
  ),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Bitsketcher - Portfolio of Shivam Gupta",
    description:
      "Portfolio of Shivam Gupta – developer, creator, and tech enthusiast. Showcasing projects, experience, blogs, and contact information.",
    type: "website",
    url: "/",
    siteName: "Bitsketcher",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Bitsketcher - Portfolio of Shivam Gupta",
    description:
      "Portfolio of Shivam Gupta – developer, creator, and tech enthusiast. Showcasing projects, experience, blogs, and contact information.",
    creator: "@bitsketcher",
    site: "@bitsketcher",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const dynamic = "force-dynamic";

export default function Home() {
  return (
    <Container className="blur-in flex flex-col gap-12">
      <Heroic />
      <GitHubGraph />
      <Projects />
      <Experience />
      <About />
      <Contact />
    </Container>
  );
}
