import Heroic from "@/components/pages/home/heroic";
import GitHubGraph from "@/components/pages/home/github-graph";
import Projects from "@/components/pages/home/projects";
import Container from "@/components/common/container";
import Experience from "@/components/pages/home/experience";
import About from "@/components/pages/home/about";
import Contact from "@/components/pages/home/contact";

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
