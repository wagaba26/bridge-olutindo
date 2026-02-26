import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { ScrollProgress } from "@/components/site/scroll-progress";
import { ScrollToTopButton } from "@/components/site/scroll-to-top";
import { ScrollReveal } from "@/components/site/scroll-reveal";
import { SiteLanguageProvider } from "@/components/site/language-provider";

export const metadata: Metadata = {
  title: "Bridge Olutindo | Connect with Japan",
  description: "Learn Japanese, prepare for study and daily life in Japan, and connect with trusted Uganda-Japan support.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className="antialiased min-h-screen flex flex-col font-sans square-ui no-gradients monochrome-ui"
      >
        <SiteLanguageProvider>
          <ScrollProgress />
          <Header />
          <main className="flex-1 overflow-x-clip">
            <ScrollReveal />
            {children}
          </main>
          <Footer />
          <ScrollToTopButton />
        </SiteLanguageProvider>
      </body>
    </html>
  );
}
