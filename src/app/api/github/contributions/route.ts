import { NextResponse } from "next/server";

export async function GET() {
  try {
    const username = "shivam-070208";
    
    if (process.env.GITHUB_TOKEN) {
      const toDate = new Date();
      const fromDate = new Date();
      fromDate.setFullYear(fromDate.getFullYear() - 1);
      
      const query = `
        query($username: String!, $from: DateTime!, $to: DateTime!) {
          user(login: $username) {
            contributionsCollection(from: $from, to: $to) {
              contributionCalendar {
                totalContributions
                weeks {
                  contributionDays {
                    date
                    contributionCount
                    color
                  }
                }
              }
            }
          }
        }
      `;

      const variables = { 
        username,
        from: fromDate.toISOString(),
        to: toDate.toISOString(),
      };

      const response = await fetch("https://api.github.com/graphql", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        },
        body: JSON.stringify({ query, variables }),
        next: { revalidate: 3600 }, 
      });

      if (response.ok) {
        const data = await response.json();
        if (!data.errors && data.data?.user?.contributionsCollection) {
            const contributions = data.data.user.contributionsCollection.contributionCalendar;
          return NextResponse.json({
            totalContributions: contributions.totalContributions,
            weeks: contributions.weeks,
          });
        }
      }
    }


    

    return NextResponse.json(
      {
        totalContributions: 0,
        weeks: [],
        error: "Unable to fetch contribution data. Add GITHUB_TOKEN to environment variables for better results.",
      },
      { status: 500 }
    );
  } catch (error) {
    console.error("Error fetching GitHub contributions:", error);
    return NextResponse.json(
      {
        totalContributions: 0,
        weeks: [],
        error: "Failed to fetch contributions",
      },
      { status: 500 }
    );
  }
}

