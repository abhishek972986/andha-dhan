"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { createPortal } from "react-dom";

export interface DropdownMenuProps {
  options: {
    label: string;
    onClick: () => void;
    Icon?: React.ReactNode;
  }[];
  children: React.ReactNode;
  className?: string;
}

export function DropdownMenu({ options, children, className = "" }: DropdownMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const [openUp, setOpenUp] = useState(false);
  const [maxMenuHeight, setMaxMenuHeight] = useState(280);
  const [menuLeft, setMenuLeft] = useState(0);
  const [menuTop, setMenuTop] = useState(0);
  const [menuWidth, setMenuWidth] = useState(180);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if (!isOpen) return;

    const updateMenuLayout = () => {
      const rect = triggerRef.current?.getBoundingClientRect();
      if (!rect) return;

      const viewportPadding = 12;
      const triggerGap = 8;
      const targetWidth = Math.max(180, Math.round(rect.width));
      const clampedLeft = Math.min(
        window.innerWidth - viewportPadding - targetWidth,
        Math.max(viewportPadding, rect.left)
      );

      const spaceBelow = window.innerHeight - rect.bottom - triggerGap - viewportPadding;
      const spaceAbove = rect.top - viewportPadding;
      const shouldOpenUp = spaceBelow < 220 && spaceAbove > spaceBelow;

      setOpenUp(shouldOpenUp);
      setMaxMenuHeight(Math.max(120, Math.min(320, shouldOpenUp ? spaceAbove : spaceBelow)));
      setMenuWidth(targetWidth);
      setMenuLeft(clampedLeft);
      setMenuTop(shouldOpenUp ? rect.top - triggerGap : rect.bottom + triggerGap);
    };

    updateMenuLayout();
    window.addEventListener("resize", updateMenuLayout);
    window.addEventListener("scroll", updateMenuLayout, true);

    return () => {
      window.removeEventListener("resize", updateMenuLayout);
      window.removeEventListener("scroll", updateMenuLayout, true);
    };
  }, [isOpen]);

  return (
    <div ref={containerRef} className={`relative inline-block ${className}`}>
      <button
        ref={triggerRef}
        onClick={toggleDropdown}
        className="px-3 py-1.5 bg-white/15 hover:bg-white/20 border border-white/25 rounded-lg backdrop-blur-sm transition-all duration-200 text-white text-xs font-medium flex items-center gap-2"
      >
        {children}
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 9l6 6 6-6" />
          </svg>
        </motion.span>
      </button>

      {typeof document !== "undefined" &&
        createPortal(
          <AnimatePresence>
            {isOpen && (
              <>
                {/* Backdrop to close dropdown */}
                <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />

                <motion.div
                  initial={{ y: openUp ? 8 : -8, scale: 0.94, opacity: 0 }}
                  animate={{ y: 0, scale: 1, opacity: 1 }}
                  exit={{ y: openUp ? 8 : -8, scale: 0.94, opacity: 0 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  className="fixed z-50 py-1 bg-white/10 backdrop-blur-md rounded-xl border border-white/20 shadow-xl overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
                  style={{
                    left: `${menuLeft}px`,
                    top: openUp ? "auto" : `${menuTop}px`,
                    bottom: openUp ? `${window.innerHeight - menuTop}px` : "auto",
                    width: `${menuWidth}px`,
                    maxHeight: `${maxMenuHeight}px`,
                  }}
                >
                  {options && options.length > 0 ? (
                    <div className="flex flex-col gap-0">
                      {options.map((option, index) => (
                        <motion.button
                          key={option.label}
                          initial={{ opacity: 0, x: -4 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -4 }}
                          transition={{
                            duration: 0.2,
                            delay: index * 0.05,
                          }}
                          onClick={() => {
                            option.onClick();
                            setIsOpen(false);
                          }}
                          className="px-3 py-2 cursor-pointer text-white text-xs hover:bg-white/10 transition-colors duration-150 w-full text-left flex items-center gap-2 rounded-md mx-1"
                          style={{
                            marginLeft: "4px",
                            marginRight: "4px",
                          }}
                        >
                          {option.Icon && <span>{option.Icon}</span>}
                          <span>{option.label}</span>
                        </motion.button>
                      ))}
                    </div>
                  ) : (
                    <div className="px-3 py-2 text-white text-xs opacity-50">No options</div>
                  )}
                </motion.div>
              </>
            )}
          </AnimatePresence>,
          document.body
        )}
    </div>
  );
}
