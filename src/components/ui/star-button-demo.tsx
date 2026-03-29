"use client";

import { useEffect, useState } from "react";
import { StarButton } from "@/components/ui/star-button";

export default function StarButtonDemo() {
  const [lightColor, setLightColor] = useState("#FAFAFA");

  useEffect(() => {
    const isDark =
      typeof window !== "undefined" &&
      document.documentElement.classList.contains("dark");
    setLightColor(isDark ? "#FAFAFA" : "#FF2056");
  }, []);

  return (
    <div>
      <StarButton lightColor={lightColor} className="rounded-3xl">
        Button
      </StarButton>
    </div>
  );
}
