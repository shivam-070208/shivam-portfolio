import { cn } from "@/lib/utils";
import Heading from "../ui/heading";
import SubHeading from "../ui/sub-heading";
import type { ContainerProps } from "./container";
import Container from "./container";

const SectionContainer = ({
  as = "section",
  className,
  ...props
}: ContainerProps) => (
  <Container
    as={as}
    className={cn("flex flex-col gap-2 border-b pb-2", className)}
    {...props}
  />
);

// Section header: title, description, right content
interface SectionHeaderProps {
  title: string;
  description: string;
  className?: string;
  children?: React.ReactNode;
}

const SectionHeader = ({
  title,
  description,
  className,
  children,
}: SectionHeaderProps) => (
  <div
    className={cn(
      "flex flex-wrap items-center justify-between gap-4",
      className
    )}>
    <div className="flex flex-col gap-1">
      <Heading as="h3">{title}</Heading>
      {description && (
        <SubHeading size="sm" className="text-muted-foreground ml-2" as="p">
          {description}
        </SubHeading>
      )}
    </div>
    {children && <div>{children}</div>}
  </div>
);

// Section inner content
interface SectionContentProps {
  children: React.ReactNode;
  className?: string;
}

const SectionContent = ({ children, className }: SectionContentProps) => (
  <Container className={cn("p-2", className)}>{children}</Container>
);

export { SectionContainer, SectionHeader, SectionContent };
