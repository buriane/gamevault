"use client";

import { useState, useEffect } from "react";
import GameDetailLoading from "./loading";

export default function GameDetailContent({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 350);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) return <GameDetailLoading />;

  return <>{children}</>;
}
