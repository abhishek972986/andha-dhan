"use client";

import React from "react";
import { cn } from "@/lib/utils";
import "./StarBorder.css";

type StarBorderProps<T extends React.ElementType = "button"> = {
  as?: T;
  className?: string;
  color?: string;
  speed?: string;
  thickness?: number;
  children: React.ReactNode;
} & Omit<React.ComponentPropsWithoutRef<T>, "as" | "children" | "className">;

const StarBorder = <T extends React.ElementType = "button">({
  as,
  className = "",
  color = "white",
  speed = "6s",
  thickness = 1,
  children,
  ...rest
}: StarBorderProps<T>) => {
  const Component = (as || "button") as React.ElementType;
  const existingStyle = (rest as { style?: React.CSSProperties }).style;

  return (
    <Component
      className={cn("star-border-container", className)}
      style={{
        padding: `${thickness}px 0`,
        ...(existingStyle || {}),
      }}
      {...rest}
    >
      <div
        className="border-gradient-bottom"
        style={{
          background: `radial-gradient(circle, ${color}, transparent 55%)`,
          animationDuration: speed,
        }}
      />
      <div
        className="border-gradient-top"
        style={{
          background: `radial-gradient(circle, ${color}, transparent 55%)`,
          animationDuration: speed,
        }}
      />
      <div className="inner-content">{children}</div>
    </Component>
  );
};

export default StarBorder;
