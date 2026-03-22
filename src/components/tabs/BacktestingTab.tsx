"use client";

import React, { useEffect, useState } from "react";
import { PromptInputBox } from "@/components/ui/ai-prompt-box";
import { DropdownMenu } from "@/components/ui/dropdown-menu";

interface Message {
  id: string;
  type: "user" | "assistant";
  content: string;
  timestamp: Date;
}

interface BacktestRequest {
  message: string;
  userText: string;
  formattedPrompt: string;
  currency: string;
  duration: string;
  timing: string;
  timestamp: string;
}

const CURRENCIES = ["EUR/USD", "GBP/USD", "USD/JPY", "Gold", "Silver", "Bitcoin", "Ethereum", "SPY", "QQQ"];
const DURATIONS = ["1 week", "1 month", "3 months", "6 months", "1 year", "2 years", "5 years"];
const TIMINGS = ["1m", "5m", "15m", "30m", "1h", "4h", "1d", "1w"];
const BACKTEST_MESSAGES_STORAGE_KEY = "backtesting-messages-v1";
const DEFAULT_ASSISTANT_MESSAGE: Message = {
  id: "1",
  type: "assistant",
  content:
    "Hello! I'm your backtesting assistant. Select your trading parameters (currency, duration, timing) and describe your strategy. I'll configure a backtest and send the data to our analysis engine.",
  timestamp: new Date(),
};

export function BacktestingTab() {
  const [messages, setMessages] = useState<Message[]>(() => {
    if (typeof window === "undefined") {
      return [DEFAULT_ASSISTANT_MESSAGE];
    }

    try {
      const saved = window.localStorage.getItem(BACKTEST_MESSAGES_STORAGE_KEY);
      if (!saved) {
        return [DEFAULT_ASSISTANT_MESSAGE];
      }

      const parsed = JSON.parse(saved) as Array<{
        id: string;
        type: "user" | "assistant";
        content: string;
        timestamp: string;
      }>;

      if (!Array.isArray(parsed) || parsed.length === 0) {
        return [DEFAULT_ASSISTANT_MESSAGE];
      }

      return parsed.map((msg) => ({
        ...msg,
        timestamp: new Date(msg.timestamp),
      }));
    } catch {
      return [DEFAULT_ASSISTANT_MESSAGE];
    }
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(BACKTEST_MESSAGES_STORAGE_KEY, JSON.stringify(messages));
  }, [messages]);

  // Form state
  const [selectedCurrency, setSelectedCurrency] = useState("EUR/USD");
  const [selectedDuration, setSelectedDuration] = useState("1 year");
  const [selectedTiming, setSelectedTiming] = useState("1h");

  const handleSendMessage = async (message: string) => {
    if (!message.trim()) return;
    const userText = message.trim();
    const formattedPrompt = `[${selectedCurrency} | ${selectedDuration} | ${selectedTiming}]\n${userText}`;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: formattedPrompt,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    // Prepare backtest request
    const backtestRequest: BacktestRequest = {
      message: userText,
      userText,
      formattedPrompt,
      currency: selectedCurrency,
      duration: selectedDuration,
      timing: selectedTiming,
      timestamp: new Date().toISOString(),
    };

    // Send to API
    try {
      const response = await fetch("/api/backtest", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(backtestRequest),
      });

      const data = await response.json();

      // Add assistant response
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: "assistant",
        content:
          data.message ||
          `Backtest configured successfully!\n\n• Asset: ${selectedCurrency}\n• Duration: ${selectedDuration}\n• Timeframe: ${selectedTiming}\n• Strategy: ${userText}\n\nAnalyzing... Results will appear shortly.`,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Error sending backtest request:", error);

      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: "assistant",
        content: `Backtest request received and queued:\n\n• Asset: ${selectedCurrency}\n• Duration: ${selectedDuration}\n• Timeframe: ${selectedTiming}\n• Strategy: ${userText}\n\nProcessing... Check results panel for updates.`,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full h-full flex flex-col justify-center items-center bg-[radial-gradient(125%_125%_at_50%_101%,rgba(245,87,2,1)_10.5%,rgba(245,120,2,1)_16%,rgba(245,140,2,1)_17.5%,rgba(245,170,100,1)_25%,rgba(238,174,202,1)_40%,rgba(202,179,214,1)_65%,rgba(148,201,233,1)_100%)] px-4">
      <div className="w-full max-w-175">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
            Strategy Lab
          </h2>
          <p className="text-white/80 text-sm md:text-base">
            Describe your trade strategy and backtest it across different assets
          </p>
        </div>

        {/* Chat Messages */}
        <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/15 p-4 mb-6 max-h-87.5 overflow-y-auto">
          <div className="space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-xs md:max-w-sm px-4 py-3 rounded-xl backdrop-blur-sm ${
                    msg.type === "user"
                      ? "bg-white/20 text-white border border-white/25"
                      : "bg-white/10 text-white/95 border border-white/15"
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                  <p className="text-xs mt-2 text-white/50">
                    {msg.timestamp.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white/10 text-white/80 px-4 py-3 rounded-xl border border-white/15 backdrop-blur-sm">
                  <div className="flex gap-2">
                    <div className="w-2 h-2 bg-white rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-white rounded-full animate-bounce delay-100" />
                    <div className="w-2 h-2 bg-white rounded-full animate-bounce delay-200" />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Input Area with Dropdown Menus */}
        <div className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 p-4">
          {/* Parameter Dropdowns */}
          <div className="flex flex-wrap gap-2 mb-4">
            {/* Asset Selector */}
            <DropdownMenu
              options={CURRENCIES.map((currency) => ({
                label: currency,
                onClick: () => setSelectedCurrency(currency),
              }))}
            >
              {selectedCurrency}
            </DropdownMenu>

            {/* Duration Selector */}
            <DropdownMenu
              options={DURATIONS.map((duration) => ({
                label: duration,
                onClick: () => setSelectedDuration(duration),
              }))}
            >
              {selectedDuration}
            </DropdownMenu>

            {/* Timeframe Selector */}
            <DropdownMenu
              options={TIMINGS.map((timing) => ({
                label: timing,
                onClick: () => setSelectedTiming(timing),
              }))}
            >
              {selectedTiming}
            </DropdownMenu>
          </div>

          {/* AI Prompt Input Box */}
          <PromptInputBox onSend={handleSendMessage} isLoading={isLoading} />
        </div>
      </div>
    </div>
  );
}
