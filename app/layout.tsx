import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { WishlistProvider } from "@/context/WishlistContext";
import { ThemeProvider } from "@/context/ThemeProvider";

const plusJakarta = Plus_Jakarta_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "GameVault",
  description: "Katalog game terlengkap untuk gamer Indonesia",
};

// This prevents the flash where skeletons/content render with wrong theme.
const themeScript = `(function(){try{var t=localStorage.getItem('gamevault-theme');var d=document.documentElement;d.classList.remove('light','dark');if(t==='light')d.classList.add('light');else if(t==='dark')d.classList.add('dark');else{d.classList.add(window.matchMedia('(prefers-color-scheme:dark)').matches?'dark':'light')}}catch(e){d.classList.add('dark')}})()`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className="dark scroll-smooth" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className={`${plusJakarta.className} bg-(--bg-primary) text-(--text-primary) flex flex-col min-h-screen antialiased selection:bg-(--selection-bg) selection:text-(--selection-text)`}>
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