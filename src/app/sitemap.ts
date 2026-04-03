import { MetadataRoute } from "next";
import { blogsQuery } from "@/lib/wix-client";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const sitemap: MetadataRoute.Sitemap = [
    {
      url: `${BASE_URL}/`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${BASE_URL}/blogs`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
  ];

  try {
    const { items: blogs } = await blogsQuery.find();

    if (blogs && blogs.length > 0) {
      const blogEntries: MetadataRoute.Sitemap = blogs.map((blog) => {
        const lastModified =
          blog._updatedDate || blog.publishedOn || blog._createdDate;
        return {
          url: `${BASE_URL}/blogs/${blog._id}`,
          lastModified: new Date(lastModified),
          changeFrequency: "monthly" as const,
          priority: 0.6,
        };
      });

      sitemap.push(...blogEntries);
    }
  } catch (error) {
    console.error("Error fetching blogs for sitemap:", error);
  }

  return sitemap;
}
