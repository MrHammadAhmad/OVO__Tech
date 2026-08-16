import type { Metadata } from "next";
import { Raleway } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const raleway = Raleway({
  variable: "--font-raleway",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ovotech | Healthcare AI, RPA & Automation",
  description: "Ovotech combines artificial intelligence and robotic process automation to streamline repetitive healthcare workflows and improve operational efficiency.",
  metadataBase: new URL("https://ovotech.co.uk"),
  openGraph: {
    title: "Ovotech | Healthcare AI, RPA & Automation",
    description: "Intelligent automation built around your healthcare workflow. Streamline operations and reduce administrative workload.",
    type: "website",
    locale: "en_GB",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${raleway.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-bg-light text-foreground-dark">
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
