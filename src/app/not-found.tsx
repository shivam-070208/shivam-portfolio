"use client";

import Link from "next/link";
import Image from "next/image";

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
      <Image
        src="https://media.giphy.com/media/hEc4k5pN17GZq/giphy.gif"
        alt="404 Not Found"
        width={288}
        height={288}
        className="mb-8 h-72 w-72 rounded-md object-contain shadow-lg"
        priority
        unoptimized
      />
      <h1 className="text-primary mb-4 text-4xl font-bold">Page Not Found</h1>
      <p className="text-muted-foreground mb-6 text-lg">
        Oops! The page you&apos;re looking for does not exist.
      </p>
      <Link href="/" className="mt-2 rounded px-6 py-2 transition">
        Go Home
      </Link>
    </div>
  );
}
