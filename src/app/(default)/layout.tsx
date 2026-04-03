import Container from "@/components/common/container";
import NavBar from "@/components/common/navbar";

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <Container maxWidth="2xl" className="min-h-dvh border-x border-dashed pb-5">
      <NavBar />
      {children}
    </Container>
  );
}
