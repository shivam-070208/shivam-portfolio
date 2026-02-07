import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ThemeProvider from "@/components/providers/theme-provider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Bitsketcher",
    template: "%s - Bitsketcher",
  },
  description:
    "Portfolio of Shivam Gupta – developer, creator, and tech enthusiast. Showcasing projects, experience, blogs, and contact information.",
  keywords: [
    "Bitsketcher",
    "Shivam Gupta",
    "Developer",
    "Web Developer",
    "Frontend",
    "Backend",
    "Full Stack",
    "React",
    "Next.js",
    "TypeScript",
    "Portfolio",
    "JavaScript",
    "UI",
    "UX",
    "TailwindCSS",
    "CSS",
    "HTML",
    "Tech Portfolio",
    "Engineer",
    "Next Generation Web",
    "Open Source",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://bitsketcher.com",
    siteName: "Bitsketcher",
    title: "Bitsketcher - Portfolio of Shivam Gupta",
    description:
      "Portfolio of Shivam Gupta – developer, creator, and tech enthusiast. Showcasing projects, experience, blogs, and contact information.",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Bitsketcher Logo",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@bitsketcher",
    creator: "@bitsketcher",
    title: "Bitsketcher - Portfolio of Shivam Gupta",
    description:
      "Portfolio of Shivam Gupta – developer, creator, and tech enthusiast. Showcasing projects, experience, blogs, and contact information.",
    images: ["/og.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} antialiased`}>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
