"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Gamepad2, Home, Library, Heart } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();

  const navItems = [
    { name: "Home", href: "/", icon: Home },
    { name: "Games", href: "/games", icon: Library },
    { name: "Wishlist", href: "/wishlist", icon: Heart },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-white/5 bg-[#171a21]/80 backdrop-blur-md">
      <div className="container mx-auto px-6 h-20 flex items-center justify-between">
        <Link href="/" className="text-2xl font-extrabold tracking-tighter flex items-center gap-3 group">
          <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-linear-to-br from-sky-400 to-blue-600 shadow-lg shadow-blue-500/25 group-hover:scale-105 transition-transform">
            <Gamepad2 className="w-5 h-5 text-white" />
          </div>
          <span className="text-transparent bg-clip-text bg-linear-to-r from-sky-400 to-blue-500">
            GameVault
          </span>
        </Link>
        <div className="flex items-center gap-2 sm:gap-3 text-sm font-medium">
          {navItems.map((item) => {
            const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
            const Icon = item.icon;
            
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`group flex items-center gap-3 px-3 py-2 rounded-xl transition-all ${
                  isActive
                    ? "text-white bg-white/10"
                    : "text-gray-400 hover:text-white hover:bg-white/5"
                }`}
              >
                <div className={`p-1.5 rounded-lg transition-colors ${
                  isActive 
                    ? "bg-linear-to-br from-sky-500 to-blue-600 text-white shadow-md shadow-blue-500/20" 
                    : "bg-white/5 text-gray-400 group-hover:bg-white/10 group-hover:text-white"
                }`}>
                  <Icon className="w-4 h-4" />
                </div>
                <span className="hidden sm:inline font-semibold">{item.name}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}