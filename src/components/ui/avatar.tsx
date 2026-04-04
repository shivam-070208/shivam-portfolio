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
  isWobbled?: boolean;
};

const Avatar = ({
  tooltip = false,
  className,
  children,
  tooltipTitle,
  isWobbled = true,
}: Readonly<AvatarProps>) => {
  const avatarContent = (
    <div
      className={cn(
        "h-fit w-fit overflow-hidden rounded-full",
        isWobbled && "wobbly",
        className
      )}>
      {children}
    </div>
  );

  if (tooltip === true && tooltipTitle) {
    return (
      <Tooltip>
        <TooltipTrigger asChild>{avatarContent}</TooltipTrigger>
        <TooltipContent>{tooltipTitle}</TooltipContent>
      </Tooltip>
    );
  }

  return avatarContent;
};

export default Avatar;
