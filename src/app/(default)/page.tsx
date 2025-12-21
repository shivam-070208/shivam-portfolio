import Heroic from "@/components/pages/home/heroic";
import GitHubGraph from "@/components/pages/home/github-graph";
import Projects from "@/components/pages/home/projects";
import Container from "@/components/common/container";




export default function Home() {
  return (
   <Container className="flex flex-col gap-12 blur-in">
   <Heroic />
   <GitHubGraph />
   <Projects />
   </Container>
  );
}
