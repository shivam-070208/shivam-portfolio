import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipTrigger } from "./tooltip";

type TooltipProps =
  | {
      tooltip?: false;
      tooltipTitle?: never;
    }
  | {
      tooltip: true;
      tooltipTitle: string;
    };

type AvatarProps = TooltipProps & {
  className?: string;
  children: React.ReactNode;
};

const Avatar = ({
  tooltip = false,
  className,
  children,
  tooltipTitle,
}: Readonly<AvatarProps>) => {
  const avatarContent = (
    <div className={cn("rounded-full w-fit h-fit overflow-hidden", className)}>
      {children}
    </div>
  );

  if (tooltip === true && tooltipTitle) {
    return (
      <Tooltip>
        <TooltipTrigger asChild>
          {avatarContent}
        </TooltipTrigger>
        <TooltipContent>
          {tooltipTitle}
        </TooltipContent>
      </Tooltip>
    );
  }

  return avatarContent;
};

export default Avatar;
