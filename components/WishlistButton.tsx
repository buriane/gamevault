"use client";

import { Heart } from "lucide-react";
import { useWishlist } from "@/context/WishlistContext";

interface WishlistButtonProps {
  slug: string;
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
}

export default function WishlistButton({
  slug,
  size = "md",
  showLabel = false,
}: WishlistButtonProps) {
  const { isInWishlist, toggleWishlist } = useWishlist();
  const inWishlist = isInWishlist(slug);

  const sizeClasses = {
    sm: "p-1.5",
    md: "p-2.5",
    lg: "px-5 py-3",
  };

  const iconSizes = {
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-5 h-5",
  };

  return (
    <button
      onClick={() => toggleWishlist(slug)}
      className={`inline-flex items-center gap-2 rounded-xl font-semibold transition-all ${
        sizeClasses[size]
      } ${
        inWishlist
          ? "bg-pink-500/20 text-pink-400 border border-pink-500/30 hover:bg-pink-500/30"
          : "bg-(--overlay-medium) text-(--text-muted) border border-(--border-default) hover:text-(--text-primary) hover:bg-(--overlay-heavy) hover:border-(--border-hover)"
      }`}
      aria-label={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
    >
      <Heart
        className={`${iconSizes[size]} ${
          inWishlist ? "fill-pink-400" : ""
        } transition-all`}
      />
      {showLabel && (
        <span className="text-sm">
          {inWishlist ? "Remove from Wishlist" : "Add to Wishlist"}
        </span>
      )}
    </button>
  );
}
