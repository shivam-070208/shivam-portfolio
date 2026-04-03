import { blogsQuery } from "@/lib/wix-client";
import { linktoWixImageLink } from "@/lib/utils";
import { Blog } from "@/types/blog";
import { notFound } from "next/navigation";
import Image from "next/image";
import RichContentRenderer from "@/components/pages/blogs/rich-content-renderer";
import {
  SectionContainer,
  SectionContent,
  SectionHeader,
} from "@/components/common/section-layout";
import type { Metadata } from "next";

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id } = await params;
  const { items } = await blogsQuery.eq("_id", id).find();

  const blog = items && items.length ? (items[0] as Blog) : null;

  if (!blog) {
    return {
      title: "Blog Not Found",
      description: "The requested blog post could not be found.",
    };
  }

  const imageUrl = blog.coverimage
    ? linktoWixImageLink(blog.coverimage)
    : undefined;

  return {
    title: `${blog.title} - Bitsketcher`,
    description:
      blog.description || `Read ${blog.title} - A blog post by Shivam Gupta`,
    keywords: [
      "Blog",
      "Article",
      blog.title,
      "Web Development",
      "Programming",
      "Tech",
      "Shivam Gupta",
      "Bitsketcher",
    ],
    authors: [{ name: "Shivam Gupta" }],
    creator: "Shivam Gupta",
    publisher: "Bitsketcher",
    metadataBase: new URL(
      process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
    ),
    alternates: {
      canonical: `/blogs/${id}`,
    },
    openGraph: {
      title: `${blog.title} - Bitsketcher`,
      description:
        blog.description || `Read ${blog.title} - A blog post by Shivam Gupta`,
      type: "article",
      url: `/blogs/${id}`,
      siteName: "Bitsketcher",
      locale: "en_US",
      images: imageUrl
        ? [{ url: imageUrl, alt: blog.title, width: 1200, height: 630 }]
        : [],
      publishedTime: blog.publishedOn,
      modifiedTime:
        typeof blog._updatedDate === "string"
          ? blog._updatedDate
          : blog._updatedDate?.toISOString(),
      authors: ["Shivam Gupta"],
      tags: ["Web Development", "Programming", "Tech"],
    },
    twitter: {
      card: "summary_large_image",
      title: `${blog.title} - Bitsketcher`,
      description:
        blog.description || `Read ${blog.title} - A blog post by Shivam Gupta`,
      images: imageUrl ? [imageUrl] : [],
      creator: "@bitsketcher",
      site: "@bitsketcher",
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    other: {
      "article:author": "Shivam Gupta",
      "article:publisher": "Bitsketcher",
      "article:section": "Technology",
      "article:tag": "Web Development",
    },
  };
}

function formatPublishedDate(date: string | Date) {
  const _date = typeof date === "string" ? new Date(date) : date;
  return _date.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

const BlogDetailPage = async ({ params }: PageProps) => {
  const { id } = await params;
  const { items } = await blogsQuery.eq("_id", id).find();

  const blog = items && items.length ? (items[0] as Blog) : null;
  if (!blog) return notFound();

  return (
    <SectionContainer className="flex flex-col gap-8 border-0! py-8">
      <SectionHeader
        title={blog.title}
        subHeadingClassName="max-w-full! w-full!"
        description={blog.description || ""}
      />
      <SectionContent>
        <div className="flex flex-col gap-8">
          {blog.coverimage && (
            <div className="relative h-64 w-full overflow-hidden rounded-lg border border-neutral-200 bg-neutral-100 dark:border-neutral-800 dark:bg-neutral-900">
              <Image
                src={linktoWixImageLink(blog.coverimage)}
                alt={blog.title}
                fill
                className="object-cover"
                sizes="100vw"
                priority
              />
            </div>
          )}
          <div className="flex items-center gap-3 text-sm text-neutral-500 dark:text-neutral-400">
            {blog.publishedOn && (
              <span>Published: {formatPublishedDate(blog.publishedOn)}</span>
            )}
            {blog.readTime && <span>&middot; {blog.readTime} min read</span>}
          </div>
          <article className="prose prose-neutral dark:prose-invert max-w-none">
            {blog.blog &&
            blog.blog.nodes &&
            Array.isArray(blog.blog.nodes) &&
            blog.blog.nodes.length > 0 ? (
              <RichContentRenderer
                nodes={blog.blog.nodes}
                documentStyle={blog.blog.documentStyle}
              />
            ) : (
              <p>No content.</p>
            )}
          </article>
        </div>
      </SectionContent>
    </SectionContainer>
  );
};

export default BlogDetailPage;
