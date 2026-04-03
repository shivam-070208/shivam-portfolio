import { blogsQuery } from "@/lib/wix-client";
import Image from "next/image";
import Link from "next/link";
import { linktoWixImageLink } from "@/lib/utils";
import { Blog } from "@/types/blog";
import parse from "html-react-parser";
import { Suspense } from "react";
import { PAGE_SIZE } from "@/config/constants";
import {
  SectionContainer,
  SectionContent,
} from "@/components/common/section-layout";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blogs - Bitsketcher",
  description:
    "Curated articles, case studies, and technical deep-dives covering web development, design, and my latest projects.",
  keywords: [
    "Blogs",
    "Articles",
    "Web Development",
    "Programming",
    "Tech Articles",
    "JavaScript",
    "React",
    "Next.js",
    "TypeScript",
    "Web Design",
    "Frontend",
    "Backend",
    "Full Stack",
    "Development",
    "Technology",
    "Coding",
    "Software Engineering",
  ],
  authors: [{ name: "Shivam Gupta" }],
  creator: "Shivam Gupta",
  publisher: "Bitsketcher",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
  ),
  alternates: {
    canonical: "/blogs",
  },
  openGraph: {
    title: "Blogs - Bitsketcher",
    description:
      "Curated articles, case studies, and technical deep-dives covering web development, design, and my latest projects.",
    type: "website",
    url: "/blogs",
    siteName: "Bitsketcher",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blogs - Bitsketcher",
    description:
      "Curated articles, case studies, and technical deep-dives covering web development, design, and my latest projects.",
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
};

function formatPublishedDate(date: string | Date) {
  const _date = typeof date === "string" ? new Date(date) : date;
  return _date.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

type PageProps = {
  params: Promise<{
    page?: string;
  }>;
};

function getPagination(searchParams?: { page?: string }): number {
  let page = 1;
  if (searchParams?.page) {
    const p = parseInt(searchParams.page, 10);
    if (!isNaN(p) && p > 0) page = p;
  }
  return page;
}

async function BlogsBody({ pageNum }: { pageNum: number }) {
  const offset = (pageNum - 1) * PAGE_SIZE;
  const { items: blogs, totalCount } = await blogsQuery
    .skip(offset)
    .limit(PAGE_SIZE)
    .find();

  const totalPages = Math.ceil((totalCount || 0) / PAGE_SIZE);

  const sortedBlogs = (blogs || []).slice().sort((a, b) => {
    const aDate = new Date(a.publishedOn || a._createdDate);
    const bDate = new Date(b.publishedOn || b._createdDate);
    return bDate.getTime() - aDate.getTime();
  });

  const grouped = Object.values(
    sortedBlogs.reduce(
      (acc, blog) => {
        const rawDate = blog.publishedOn || blog._createdDate;
        const date = rawDate ? new Date(rawDate) : new Date();
        const year = date.getFullYear();
        const monthName = date.toLocaleDateString(undefined, { month: "long" });
        const key = `${year}-${date.getMonth()}`;

        if (!acc[key]) {
          acc[key] = {
            key,
            year,
            monthName,
            posts: [],
          };
        }

        acc[key].posts.push(blog as Blog);
        return acc;
      },
      {} as Record<
        string,
        {
          key: string;
          year: number;
          monthName: string;
          posts: Blog[];
        }
      >
    )
  ).sort((a, b) => {
    if (a.year !== b.year) return b.year - a.year;
    return (
      new Date(`${b.monthName} 1, ${b.year}`).getMonth() -
      new Date(`${a.monthName} 1, ${a.year}`).getMonth()
    );
  });

  return (
    <>
      <div className="flex flex-col gap-6">
        {grouped.length > 0 ? (
          grouped.map((group) => (
            <section key={group.key}>
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-xl font-bold text-neutral-900 dark:text-neutral-100">
                  {group.monthName} {group.year}
                </h3>
                <span className="text-sm text-neutral-500 dark:text-neutral-400">
                  {group.posts.length} posts
                </span>
              </div>
              <div className="flex flex-col divide-y divide-neutral-200 overflow-hidden rounded-lg border border-neutral-100 dark:divide-neutral-800 dark:border-neutral-800">
                {group.posts.map((blog, idx) => (
                  <div
                    key={blog._id}
                    className={
                      idx !== group.posts.length - 1
                        ? "border-b border-neutral-200 dark:border-neutral-800"
                        : ""
                    }>
                    <Link
                      href={`/blogs/${blog._id}`}
                      className="flex items-center gap-5 px-4 py-5 transition-colors hover:bg-neutral-50 dark:hover:bg-neutral-900">
                      <div className="relative h-24 w-36 shrink-0 overflow-hidden rounded-md border border-neutral-200 bg-neutral-100 dark:border-neutral-800 dark:bg-neutral-900">
                        {blog.coverimage ? (
                          <Image
                            src={linktoWixImageLink(blog.coverimage)}
                            alt={blog.title}
                            fill
                            className="object-cover"
                            sizes="144px"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center text-sm text-neutral-400">
                            No Image
                          </div>
                        )}
                      </div>
                      <div className="min-w-0 flex-1">
                        <h2 className="text-lg font-semibold text-neutral-900 group-hover:underline dark:text-neutral-50">
                          {blog.title}
                        </h2>
                        <div className="mt-1 flex items-center gap-3 text-xs text-neutral-500 dark:text-neutral-400">
                          <span>
                            {blog.publishedOn
                              ? formatPublishedDate(blog.publishedOn)
                              : "Unpublished"}
                          </span>
                          {blog.readTime && (
                            <>
                              <span className="mx-1">·</span>
                              <span>{blog.readTime} min read</span>
                            </>
                          )}
                        </div>
                        <div className="mt-2 line-clamp-2 text-sm text-neutral-700 dark:text-neutral-300">
                          {blog.description
                            ? parse(blog.description)
                            : "No summary available."}
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            </section>
          ))
        ) : (
          <div className="py-12 text-center text-neutral-400">
            No blogs found.
          </div>
        )}
      </div>
      {/* Pagination Controls */}
      {totalPages > 1 && (
        <nav
          className="mt-10 flex items-center justify-center gap-2"
          aria-label="Pagination">
          <Link
            href={`?page=${pageNum - 1}`}
            className={`rounded px-3 py-1 transition hover:bg-neutral-200 dark:hover:bg-neutral-700 ${
              pageNum === 1 ? "pointer-events-none opacity-30" : ""
            }`}
            aria-disabled={pageNum === 1}>
            Previous
          </Link>
          {Array.from({ length: totalPages }, (_, i) => (
            <Link
              key={i + 1}
              href={`?page=${i + 1}`}
              className={`rounded px-3 py-1 font-medium ${
                pageNum === i + 1
                  ? "bg-neutral-800 text-white dark:bg-neutral-100 dark:text-neutral-900"
                  : "hover:bg-neutral-200 dark:hover:bg-neutral-700"
              } transition`}
              aria-current={pageNum === i + 1 ? "page" : undefined}>
              {i + 1}
            </Link>
          ))}
          <Link
            href={`?page=${pageNum + 1}`}
            className={`rounded px-3 py-1 transition hover:bg-neutral-200 dark:hover:bg-neutral-700 ${
              pageNum === totalPages ? "pointer-events-none opacity-30" : ""
            }`}
            aria-disabled={pageNum === totalPages}>
            Next
          </Link>
        </nav>
      )}
    </>
  );
}

const page = async ({ params }: PageProps) => {
  const { page } = await params;
  const pageNum = getPagination({ page });

  return (
    <SectionContainer className="flex flex-col gap-8 border-0! py-8">
      <SectionContent>
        <Suspense
          fallback={<div className="py-12 text-center">Loading blogs...</div>}>
          <BlogsBody pageNum={pageNum} />
        </Suspense>
      </SectionContent>
    </SectionContainer>
  );
};

export const dynamic = "force-dynamic";
export default page;
