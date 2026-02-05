"use client";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import {  LoaderIcon } from "lucide-react";
import { githubUrl } from "@/config/constants";
import {
  SectionContainer,
  SectionContent,
  SectionHeader,
} from "@/components/common/section-layout";
import Link from "next/link";

interface ContributionDay {
  date: string;
  contributionCount: number;
  color: string;
}

interface Week {
  contributionDays: ContributionDay[];
}

interface ContributionsData {
  totalContributions: number;
  weeks: Week[];
  error?: string;
}

const GitHubGraph = () => {
  const [data, setData] = useState<ContributionsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const fetchContributions = async () => {
      try {
        const response = await fetch("/api/github/contributions");
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error("Error fetching contributions:", error);
        setData({
          totalContributions: 0,
          weeks: [],
          error: "Failed to load contributions",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchContributions();
  }, []);

  // Get color intensity based on contribution count
  const getIntensityColor = (count: number) => {
    switch (true) {
      case count === 0:
        return "border"; // no contributions
      case count <= 2:
        return "border bg-green-100/60 opacity-40"; // low
      case count <= 4:
        return "border bg-green-200/60"; // medium-low
      case count <= 6:
        return "border bg-green-400/60"; // medium-high
      default:
        return "border bg-green-600/60"; // high
    }
  };

  if (!mounted) {
    return null;
  }

  const weeks = data?.weeks || [];
  const totalContributions = data?.totalContributions || 0;
  const displayWeeks = weeks;

  return (
    <SectionContainer>
      <SectionHeader
        title="Github Contribution"
        description={`Total ${totalContributions} in past 365 days.`}
      >
        <Link href={githubUrl} className="text-sm inline-flex justify-center items-center gap-1" target="_blank" rel="noopener noreferrer">
          view on github
          <svg xmlns="http://www.w3.org/2000/svg" className="inline w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 7l-10 10M17 17V7h-10" />
          </svg>
        </Link>
      </SectionHeader>
      <SectionContent>
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <LoaderIcon className="animate-spin" />
          </div>
        ) : data?.error ? (
          <div className="rounded-lg border-dashed border p-8 text-center">
            <p className="text-muted-foreground text-sm">
              {data.error.includes("GITHUB_TOKEN")
                ? "GitHub API requires authentication. Add GITHUB_TOKEN to your environment variables."
                : "Unable to load contribution data. Please try again later."}
            </p>
          </div>
        ) : (
          <div className="relative">
            <div className={cn("rounded-lg p-6", "border-2")}>
              <div
                className="overflow-x-auto pb-4 -mx-2 px-2 scrollbar-hide"
                ref={(el) => {
                  if (el) {
                    el.scrollLeft = el.scrollWidth;
                  }
                }}
              >
                <div className="flex gap-1 min-w-max p-1">
                  {displayWeeks.map((week, weekIndex) => (
                    <div key={weekIndex} className="flex flex-col gap-1">
                      {week.contributionDays.map((day, dayIndex) => (
                        <div
                          key={`${weekIndex}-${dayIndex}`}
                          className={cn(
                            "w-3 h-3 rounded-sm transition-all duration-200",
                            "hover:scale-110 hover:ring-2 hover:ring-emerald-400/50 cursor-pointer",
                            getIntensityColor(day.contributionCount)
                          )}
                          title={`${day.contributionCount} contribution${
                            day.contributionCount !== 1 ? "s" : ""
                          } on ${new Date(day.date).toLocaleDateString(
                            "en-US",
                            {
                              weekday: "short",
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            }
                          )}`}
                        />
                      ))}
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between mt-4 text-xs text-neutral-400">
                <span>Less</span>
                <div className="flex gap-1 items-center">
                  <div
                    className={cn("w-3 h-3 rounded-sm", getIntensityColor(0))}
                  />
                  <div
                    className={cn("w-3 h-3 rounded-sm", getIntensityColor(2))}
                  />
                  <div
                    className={cn("w-3 h-3 rounded-sm", getIntensityColor(4))}
                  />
                  <div
                    className={cn("w-3 h-3 rounded-sm", getIntensityColor(6))}
                  />
                  <div
                    className={cn("w-3 h-3 rounded-sm", getIntensityColor(8))}
                  />
                </div>
                <span>More</span>
              </div>
            </div>
          </div>
        )}
      </SectionContent>
    </SectionContainer>
  );
};

export default GitHubGraph;
