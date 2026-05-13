"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Gamepad2, Home, Library, Heart, Sun, Moon } from "lucide-react";
import { useWishlist } from "@/context/WishlistContext";
import { useTheme } from "@/context/ThemeProvider";

export default function Navbar() {
  const pathname = usePathname();
  const { wishlist } = useWishlist();
  const { resolvedTheme, toggleTheme } = useTheme();

  const mainNavItems = [
    { name: "Home", href: "/", icon: Home },
    { name: "Games", href: "/games", icon: Library },
  ];

  const isWishlistActive = pathname === "/wishlist";

  return (
    <nav
      className="sticky top-0 z-50 w-full border-b border-(--border-subtle) bg-(--bg-nav) backdrop-blur-md"
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="container mx-auto px-6 h-20 flex items-center justify-between">
        <Link
          href="/"
          className="text-2xl font-extrabold tracking-tighter flex items-center gap-3 group"
          aria-label="GameVault — Kembali ke beranda"
        >
          <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-linear-to-br from-sky-400 to-blue-600 shadow-lg shadow-blue-500/25 group-hover:scale-105 transition-transform">
            <Gamepad2 className="w-5 h-5 text-white" aria-hidden="true" />
          </div>
          <span className="text-transparent bg-clip-text bg-linear-to-r from-sky-400 to-blue-500">
            GameVault
          </span>
        </Link>

        <div className="flex items-center gap-2 sm:gap-3 text-sm font-medium" role="menubar">
          {/* Main nav items */}
          {mainNavItems.map((item) => {
            const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
            const Icon = item.icon;

            return (
              <Link
                key={item.name}
                href={item.href}
                role="menuitem"
                aria-current={isActive ? "page" : undefined}
                className={`group flex items-center gap-3 px-3 py-2 rounded-xl transition-all ${
                  isActive
                    ? "text-(--text-primary) bg-(--overlay-medium)"
                    : "text-(--text-muted) hover:text-(--text-primary) hover:bg-(--overlay-light)"
                }`}
              >
                <div className={`p-1.5 rounded-lg transition-colors ${
                  isActive
                    ? "bg-linear-to-br from-sky-500 to-blue-600 text-white shadow-md shadow-blue-500/20"
                    : "bg-(--overlay-light) text-(--text-muted) group-hover:bg-(--overlay-medium) group-hover:text-(--text-primary)"
                }`}>
                  <Icon className="w-4 h-4" aria-hidden="true" />
                </div>
                <span className="hidden sm:inline font-semibold">{item.name}</span>
              </Link>
            );
          })}

          {/* Divider */}
          <div className="w-px h-8 bg-(--border-default) mx-1" aria-hidden="true" />

          {/* Wishlist */}
          <Link
            href="/wishlist"
            role="menuitem"
            aria-current={isWishlistActive ? "page" : undefined}
            aria-label={`Wishlist${wishlist.length > 0 ? ` (${wishlist.length} game)` : ""}`}
            className={`group flex items-center gap-3 px-3 py-2 rounded-xl transition-all ${
              isWishlistActive
                ? "text-pink-300 bg-pink-500/10 ring-1 ring-pink-500/20"
                : "text-(--text-muted) hover:text-pink-400 hover:bg-pink-500/5"
            }`}
          >
            <div className={`relative p-1.5 rounded-lg transition-colors ${
              isWishlistActive
                ? "bg-linear-to-br from-pink-500 to-rose-600 text-white shadow-md shadow-pink-500/20"
                : "bg-(--overlay-light) text-(--text-muted) group-hover:bg-pink-500/10 group-hover:text-pink-400"
            }`}>
              <Heart className={`w-4 h-4 ${isWishlistActive ? "fill-white" : ""}`} aria-hidden="true" />
              {wishlist.length > 0 && (
                <span
                  className="absolute -top-1.5 -right-1.5 flex items-center justify-center w-4 h-4 rounded-full bg-pink-500 text-white text-[9px] font-bold ring-2 ring-pink-500/20"
                  aria-hidden="true"
                >
                  {wishlist.length > 9 ? "9+" : wishlist.length}
                </span>
              )}
            </div>
            <span className="hidden sm:inline font-semibold">Wishlist</span>
          </Link>

          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-xl text-(--text-muted) hover:text-(--text-primary) hover:bg-(--overlay-light) transition-all"
            aria-label={resolvedTheme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
          >
            {resolvedTheme === "dark" ? (
              <Sun className="w-4 h-4" aria-hidden="true" />
            ) : (
              <Moon className="w-4 h-4" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>
    </nav>
  );
}