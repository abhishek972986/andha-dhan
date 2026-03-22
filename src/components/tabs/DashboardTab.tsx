import React from "react";

export function DashboardTab() {
  return (
    <div className="flex h-full flex-col gap-4">
      <div>
        <p className="text-xs uppercase tracking-[0.2em] text-neutral-500 dark:text-neutral-400">
          Dashboard
        </p>
        <h2 className="text-xl md:text-2xl font-semibold text-neutral-900 dark:text-neutral-100">
          Trading Overview
        </h2>
        <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-300">
          Summary of account performance and key risk metrics.
        </p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 md:gap-3">
        {["Balance", "PnL", "Win Rate", "Drawdown"].map((label) => (
          <div
            key={label}
            className="rounded-lg border border-neutral-200 bg-neutral-50 p-3 dark:border-neutral-700 dark:bg-neutral-800"
          >
            <p className="text-xs text-neutral-500 dark:text-neutral-400">{label}</p>
            <p className="mt-2 text-lg font-semibold text-neutral-900 dark:text-neutral-100">--</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-3 flex-1 min-h-0">
        <div className="rounded-lg border border-neutral-200 bg-neutral-50 p-4 dark:border-neutral-700 dark:bg-neutral-800">
          Equity Curve Placeholder
        </div>
        <div className="rounded-lg border border-neutral-200 bg-neutral-50 p-4 dark:border-neutral-700 dark:bg-neutral-800">
          Activity Feed Placeholder
        </div>
      </div>
    </div>
  );
}
