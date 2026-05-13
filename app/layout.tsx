import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SplashScreen from "@/components/SplashScreen";
import { WishlistProvider } from "@/context/WishlistContext";
import { ThemeProvider } from "@/context/ThemeProvider";

const plusJakarta = Plus_Jakarta_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "GameVault",
  description: "Katalog game terlengkap untuk gamer Indonesia",
};
  
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className="scroll-smooth" data-scroll-behavior="smooth" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                if (sessionStorage.getItem('splashShown')) {
                  document.documentElement.classList.add('skip-splash');
                }
              } catch (e) {}
            `,
          }}
        />
      </head>
      <body className={`${plusJakarta.className} bg-(--bg-primary) text-(--text-primary) flex flex-col min-h-screen antialiased selection:bg-(--selection-bg) selection:text-(--selection-text)`} suppressHydrationWarning>
        <SplashScreen />
        <ThemeProvider>
          <WishlistProvider>
            <Navbar />
            <main role="main" className="flex-1 flex flex-col">
              {children}
            </main>
            <Footer />
          </WishlistProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}