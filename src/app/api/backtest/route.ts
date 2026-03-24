import { NextRequest, NextResponse } from "next/server";

const N8N_WEBHOOK_URL = "https://abhishekdabas22.app.n8n.cloud/webhook-test/generate-strategy";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate request payload sent by BacktestingTab.
    if (!body.asset || !body.timeframe || !body.duration || !body.strategy) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Log request for local observability before forwarding.
    console.log("Backtest Request Received:", {
      ...body,
      receivedAt: new Date().toISOString(),
    });

    const webhookPayload = {
      asset: body.asset,
      timeframe: body.timeframe,
      duration: body.duration,
      strategy: body.strategy,
    };

    const webhookResponse = await fetch(N8N_WEBHOOK_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(webhookPayload),
      cache: "no-store",
    });

    const webhookText = await webhookResponse.text();
    let webhookData: unknown = null;

    try {
      webhookData = webhookText ? JSON.parse(webhookText) : null;
    } catch {
      webhookData = webhookText;
    }

    if (!webhookResponse.ok) {
      const webhookMessage =
        typeof webhookData === "object" && webhookData
          ? (webhookData as { message?: string }).message
          : "Webhook returned a non-success status.";
      const webhookHint =
        typeof webhookData === "object" && webhookData
          ? (webhookData as { hint?: string }).hint
          : undefined;

      return NextResponse.json(
        {
          success: false,
          error: "Failed to send data to n8n webhook",
          message: webhookMessage,
          hint: webhookHint,
          webhookStatus: webhookResponse.status,
          webhookResponse: webhookData,
        },
        { status: 502 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Backtest data sent to n8n webhook successfully.",
        webhookStatus: webhookResponse.status,
        webhookResponse: webhookData,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Backtest API Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
