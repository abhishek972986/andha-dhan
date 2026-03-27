"use client";

import React, { useEffect, useState } from "react";
import { BoltStyleChat } from "@/components/ui/bolt-style-chat";

interface Message {
  id: string;
  type: "user" | "assistant";
  content: string;
  timestamp: Date;
}

interface BacktestRequest {
  asset: string;
  timeframe: string;
  duration: string;
  strategy: string;
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
      asset: selectedCurrency,
      timeframe: selectedTiming,
      duration: selectedDuration,
      strategy: userText,
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

      if (!response.ok || data?.success === false) {
        const webhookMessage =
          typeof data?.webhookResponse === "object" && data?.webhookResponse
            ? `${data.webhookResponse.message ?? "Webhook rejected the request."}${
                data.webhookResponse.hint ? `\n${data.webhookResponse.hint}` : ""
              }`
            : "Failed to send request to webhook.";

        throw new Error(
          `${data?.error ?? "Backtest request failed"}${
            data?.webhookStatus ? ` (status ${data.webhookStatus})` : ""
          }\n${webhookMessage}`
        );
      }

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
        content: `Could not send this backtest to the webhook.\n\n• Asset: ${selectedCurrency}\n• Duration: ${selectedDuration}\n• Timeframe: ${selectedTiming}\n• Strategy: ${userText}\n\n${error instanceof Error ? error.message : "Unknown error"}`,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <BoltStyleChat
      title="What will you"
      highlightedWord="backtest"
      titleSuffix="today?"
      subtitle="Test your trading strategies & assets by chatting with AI."
      announcementText="Introducing Backtesting v2.0"
      placeholder="Describe your strategy or timeframe..."
      ctaLabel="Backtest now"
      selectors={[
        {
          id: "asset",
          value: selectedCurrency,
          options: CURRENCIES.map((item) => ({ label: item, value: item })),
          onChange: setSelectedCurrency,
        },
        {
          id: "duration",
          value: selectedDuration,
          options: DURATIONS.map((item) => ({ label: item, value: item })),
          onChange: setSelectedDuration,
        },
        {
          id: "timeframe",
          value: selectedTiming,
          options: TIMINGS.map((item) => ({ label: item, value: item })),
          onChange: setSelectedTiming,
        },
      ]}
      onSend={handleSendMessage}
      isLoading={isLoading}
    />
  );
}
