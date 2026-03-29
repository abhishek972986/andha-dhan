"use client";

import * as React from "react";
import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import { cn } from "@/lib/utils";

export interface MagicTextProps {
  text: string;
  className?: string;
}

interface WordProps {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
}

const Word: React.FC<WordProps> = ({ children, progress, range }) => {
  const opacity = useTransform(progress, range, [0, 1]);

  return (
    <span className="relative mr-1 mt-3 text-2xl font-semibold md:text-3xl">
      <span className="absolute opacity-20">{children}</span>
      <motion.span style={{ opacity }}>{children}</motion.span>
    </span>
  );
};

export const MagicText: React.FC<MagicTextProps> = ({ text, className }) => {
  const container = React.useRef<HTMLParagraphElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start 0.9", "start 0.25"],
  });

  const words = text.split(" ");

  return (
    <motion.p
      ref={container}
      className={cn("mt-5 max-w-5xl p-4 text-left text-[#111111] leading-[0.95] md:leading-[0.9]", className)}
    >
      {words.map((word, i) => {
        const start = i / words.length;
        const end = start + 1 / words.length;

        return (
          <Word key={`${word}-${i}`} progress={scrollYProgress} range={[start, end]}>
            {word}
          </Word>
        );
      })}
    </motion.p>
  );
};
