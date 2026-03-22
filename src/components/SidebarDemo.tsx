"use client";

import React, { useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar";
import {
  BriefcaseBusiness,
  FlaskConical,
  LayoutDashboard,
  Newspaper,
  TrendingUp,
} from "lucide-react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { DashboardTab } from "@/components/tabs/DashboardTab";
import { BacktestingTab } from "@/components/tabs/BacktestingTab";
import { PopularStrategiesTab } from "@/components/tabs/PopularStrategiesTab";
import { MarketNewsTab } from "@/components/tabs/MarketNewsTab";
import { PortfolioTab } from "@/components/tabs/PortfolioTab";

type TabId =
  | "dashboard"
  | "backtesting"
  | "popular-strategies"
  | "market-news"
  | "portfolio";

type SidebarItem = {
  id: TabId;
  label: string;
  href: string;
  icon: React.ReactNode;
};

export function SidebarDemo() {
  const links: SidebarItem[] = [
    {
      id: "dashboard",
      label: "Dashboard",
      href: "#dashboard",
      icon: (
        <LayoutDashboard className="text-neutral-700 dark:text-neutral-200 h-5 w-5 shrink-0" />
      ),
    },
    {
      id: "backtesting",
      label: "Backtesting",
      href: "#backtesting",
      icon: (
        <FlaskConical className="text-neutral-700 dark:text-neutral-200 h-5 w-5 shrink-0" />
      ),
    },
    {
      id: "popular-strategies",
      label: "Popular Strategies",
      href: "#popular-strategies",
      icon: (
        <TrendingUp className="text-neutral-700 dark:text-neutral-200 h-5 w-5 shrink-0" />
      ),
    },
    {
      id: "market-news",
      label: "Market News",
      href: "#market-news",
      icon: (
        <Newspaper className="text-neutral-700 dark:text-neutral-200 h-5 w-5 shrink-0" />
      ),
    },
    {
      id: "portfolio",
      label: "Portfolio",
      href: "#portfolio",
      icon: (
        <BriefcaseBusiness className="text-neutral-700 dark:text-neutral-200 h-5 w-5 shrink-0" />
      ),
    },
  ];

  const [open, setOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<TabId>("dashboard");

  return (
    <div
      className={cn(
        "flex h-screen w-screen flex-col md:flex-row bg-gray-100 dark:bg-neutral-800 overflow-hidden"
      )}
    >
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="justify-between gap-6 md:gap-10">
          <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
            {open ? <Logo /> : <LogoIcon />}
            <div className="mt-8 flex flex-col gap-2">
              {links.map((link) => (
                <SidebarLink
                  key={link.id}
                  link={link}
                  onClick={() => {
                    setActiveTab(link.id);
                    setOpen(false);
                  }}
                  className={cn(
                    "rounded-md px-2 transition-all duration-200",
                    activeTab === link.id
                      ? "bg-white dark:bg-neutral-900 shadow-sm"
                      : "hover:bg-white/70 dark:hover:bg-neutral-900/70"
                  )}
                />
              ))}
            </div>
          </div>
          <div>
            <SidebarLink
              link={{
                label: "Manu Arora",
                href: "#",
                icon: (
                  <Image
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop&crop=face"
                    className="h-7 w-7 shrink-0 rounded-full"
                    width={50}
                    height={50}
                    alt="Avatar"
                  />
                ),
              }}
            />
          </div>
        </SidebarBody>
      </Sidebar>
      <TabContent activeTab={activeTab} />
    </div>
  );
}

export const Logo = () => {
  return (
    <Link
      href="#"
      className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
    >
      <div className="h-5 w-6 bg-black dark:bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm shrink-0" />
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-medium text-black dark:text-white whitespace-pre"
      >
        Acet Labs
      </motion.span>
    </Link>
  );
};

export const LogoIcon = () => {
  return (
    <Link
      href="#"
      className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
    >
      <div className="h-5 w-6 bg-black dark:bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm shrink-0" />
    </Link>
  );
};

const TabContent = ({ activeTab }: { activeTab: TabId }) => {
  const contentByTab: Record<TabId, React.ReactNode> = {
    dashboard: <DashboardTab />,
    backtesting: <BacktestingTab />,
    "popular-strategies": <PopularStrategiesTab />,
    "market-news": <MarketNewsTab />,
    portfolio: <PortfolioTab />,
  };

  return (
    <div className="flex flex-1 min-h-0">
      <div className="p-3 md:p-8 lg:p-10 border-l border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 flex flex-col gap-3 md:gap-4 flex-1 w-full h-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.24, ease: "easeInOut" }}
            className="h-full"
          >
            {contentByTab[activeTab]}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};
