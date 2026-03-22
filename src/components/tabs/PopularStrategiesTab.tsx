import React from "react";

export function PopularStrategiesTab() {
  const items = [
    "Momentum Breakout",
    "Mean Reversion",
    "RSI Swing",
    "Trend Following",
    "Volatility Compression",
    "Pairs Trading",
  ];

  return (
    <div className="flex h-full flex-col gap-4">
      <div>
        <p className="text-xs uppercase tracking-[0.2em] text-neutral-500 dark:text-neutral-400">
          Popular Strategies
        </p>
        <h2 className="text-xl md:text-2xl font-semibold text-neutral-900 dark:text-neutral-100">
          Discover Ideas
        </h2>
        <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-300">
          Explore strategies used by top-performing traders.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-2 md:gap-3">
        {items.map((item) => (
          <div
            key={item}
            className="rounded-lg border border-neutral-200 bg-neutral-50 p-4 dark:border-neutral-700 dark:bg-neutral-800"
          >
            <p className="font-medium text-neutral-900 dark:text-neutral-100">{item}</p>
            <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-300">
              Quick summary placeholder for this strategy.
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
