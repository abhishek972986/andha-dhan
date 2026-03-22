import React from "react";

export function PortfolioTab() {
  const holdings = [
    { symbol: "AAPL", allocation: "20%" },
    { symbol: "MSFT", allocation: "18%" },
    { symbol: "NVDA", allocation: "15%" },
    { symbol: "TSLA", allocation: "12%" },
  ];

  return (
    <div className="flex h-full flex-col gap-4">
      <div>
        <p className="text-xs uppercase tracking-[0.2em] text-neutral-500 dark:text-neutral-400">
          Portfolio
        </p>
        <h2 className="text-xl md:text-2xl font-semibold text-neutral-900 dark:text-neutral-100">
          Position Tracker
        </h2>
        <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-300">
          Monitor allocation, exposure, and overall portfolio health.
        </p>
      </div>

      <div className="rounded-lg border border-neutral-200 bg-neutral-50 p-4 dark:border-neutral-700 dark:bg-neutral-800">
        <div className="grid grid-cols-2 gap-2 pb-2 text-xs text-neutral-500 dark:text-neutral-400">
          <span>Symbol</span>
          <span>Allocation</span>
        </div>
        <div className="space-y-2">
          {holdings.map((holding) => (
            <div
              key={holding.symbol}
              className="grid grid-cols-2 rounded-md bg-white px-3 py-2 text-sm dark:bg-neutral-900"
            >
              <span className="font-medium text-neutral-900 dark:text-neutral-100">{holding.symbol}</span>
              <span className="text-neutral-700 dark:text-neutral-300">{holding.allocation}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-lg border border-neutral-200 bg-neutral-50 p-4 dark:border-neutral-700 dark:bg-neutral-800 flex-1 min-h-0">
        Allocation Chart Placeholder
      </div>
    </div>
  );
}
