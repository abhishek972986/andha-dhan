import React from "react";

export function MarketNewsTab() {
  const headlines = [
    "Global indices open mixed as rate outlook shifts",
    "Crude oil rises on supply concerns",
    "Tech earnings beat expectations in Q1",
    "Dollar weakens ahead of policy update",
  ];

  return (
    <div className="flex h-full flex-col gap-4">
      <div>
        <p className="text-xs uppercase tracking-[0.2em] text-neutral-500 dark:text-neutral-400">
          Market News
        </p>
        <h2 className="text-xl md:text-2xl font-semibold text-neutral-900 dark:text-neutral-100">
          Latest Updates
        </h2>
        <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-300">
          Track headlines that could impact your positions.
        </p>
      </div>

      <div className="space-y-2 md:space-y-3">
        {headlines.map((headline, index) => (
          <article
            key={headline}
            className="rounded-lg border border-neutral-200 bg-neutral-50 p-4 dark:border-neutral-700 dark:bg-neutral-800"
          >
            <p className="text-xs text-neutral-500 dark:text-neutral-400">News {index + 1}</p>
            <p className="mt-1 text-sm md:text-base text-neutral-900 dark:text-neutral-100">{headline}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
