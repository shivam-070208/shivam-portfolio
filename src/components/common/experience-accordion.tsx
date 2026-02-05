import { Experience } from "@/types/experience";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import Heading from "@/components/ui/heading";
import Subheading from "@/components/ui/sub-heading";

const ExperienceAccordion = ({ experience }: { experience: Experience }) => {
  return (
    <Accordion type="single" collapsible>
      <AccordionItem className="flex flex-col gap-4" value={experience._id}>
        <div className="flex w-full items-center justify-between gap-2">
          <div className="flex min-w-0 flex-col">
            <div className="flex items-center gap-2">
              <Heading
                as="h3"
                size="md"
                className="m-0 truncate p-0 font-semibold">
                {experience.title}
              </Heading>
              <AccordionTrigger className="hover:bg-muted h-fit w-fit cursor-pointer p-2" />
            </div>
            <Subheading className="text-muted-foreground m-0 truncate p-0 text-xs">
              {experience.role}
            </Subheading>
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-xs whitespace-nowrap">
              {experience.from} - {experience.to}
            </span>
            <span className="text-muted-foreground text-xs">
              {experience.type}
            </span>
          </div>
        </div>
        <AccordionContent>
          <div>
            <span className="font-medium">Technologies:</span>
            <span className="ml-2 text-xs">{experience.tech.join(", ")}</span>
          </div>
          <ul className="list-disc space-y-1 pl-5">
            {experience.contributions.map((contribution, i) => (
              <li key={i}>{contribution}</li>
            ))}
          </ul>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export { ExperienceAccordion };
