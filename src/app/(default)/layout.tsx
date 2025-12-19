import Container from "@/components/common/container";
import NavBar from "@/components/common/navbar";

export default function Layout({children}:Readonly<{children: React.ReactNode}>){
    return(
        <Container maxWidth="2xl" className="border-x border-dashed h-[200vh] pb-5">
        <NavBar />
        {children}
        </Container>
    )
}