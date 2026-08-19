/**
 * AVORRIA — OPENAI PROVIDER
 * Native fetch-based. No SDK. Server-side only.
 */

import type { OpenAIMessage } from "@/lib/ai/types";

export interface OpenAICallParams {
  model: string;
  messages: OpenAIMessage[];
  responseFormat?: "json_object" | "text";
  temperature?: number;
  maxTokens?: number;
  webSearch?: boolean;
  timeoutMs?: number;
}

export interface OpenAICallResult {
  content: string;
  inputTokens: number;
  outputTokens: number;
  cachedTokens: number;
  searchCalls: number;
  latencyMs: number;
  estimatedCost: number;
}

const COST_INPUT: Record<string, number> = {
  "gpt-4o":      0.0000025,
  "gpt-4o-mini": 0.00000015,
};
const COST_OUTPUT: Record<string, number> = {
  "gpt-4o":      0.000010,
  "gpt-4o-mini": 0.00000060,
};

function estimateCost(model: string, inp: number, out: number, searches: number): number {
  return inp * (COST_INPUT[model] ?? 0.0000025)
       + out * (COST_OUTPUT[model] ?? 0.000010)
       + searches * 0.003;
}

export async function callOpenAI(params: OpenAICallParams): Promise<OpenAICallResult> {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) throw new Error("OPENAI_API_KEY not configured");

  const { model, messages, responseFormat, temperature = 0.3, maxTokens = 4096, webSearch = false, timeoutMs = 60000 } = params;
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  const startTime = Date.now();

  const body: Record<string, unknown> = { model, messages, temperature, max_tokens: maxTokens };
  if (responseFormat === "json_object") body.response_format = { type: "json_object" };
  if (webSearch) body.tools = [{ type: "web_search_preview" }];

  try {
    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: { "Authorization": `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify(body),
      signal: controller.signal,
    });
    clearTimeout(timer);
    const latencyMs = Date.now() - startTime;

    if (!res.ok) {
      const txt = await res.text().catch(() => "unknown");
      throw new Error(`OpenAI API error ${res.status}: ${txt.slice(0, 200)}`);
    }

    const data = (await res.json()) as {
      choices?: Array<{ message?: { content?: string; tool_calls?: unknown[] } }>;
      usage?: { prompt_tokens?: number; completion_tokens?: number; prompt_tokens_details?: { cached_tokens?: number } };
    };
    const choice = data.choices?.[0];
    const content: string = choice?.message?.content ?? "";
    const usage = data.usage ?? {};
    const inputTokens  = Number(usage.prompt_tokens)     || 0;
    const outputTokens = Number(usage.completion_tokens) || 0;
    const cachedTokens = Number(usage.prompt_tokens_details?.cached_tokens) || 0;
    const toolCalls: unknown[] = choice?.message?.tool_calls ?? [];
    const searchCalls = Array.isArray(toolCalls)
      ? toolCalls.filter((t: unknown) => {
          if (!t || typeof t !== "object") return false;
          return (t as Record<string, unknown>).type === "web_search_call";
        }).length
      : 0;
    const estimatedCost = estimateCost(model, inputTokens, outputTokens, searchCalls);
    return { content, inputTokens, outputTokens, cachedTokens, searchCalls, latencyMs, estimatedCost };
  } catch (err) {
    clearTimeout(timer);
    if (err instanceof Error && err.name === "AbortError") throw new Error(`OpenAI timed out after ${timeoutMs}ms`);
    throw err;
  }
}

export interface OpenAIConnectionStatus { connected: boolean; model?: string; error?: string; }

export async function checkOpenAIConnection(): Promise<OpenAIConnectionStatus> {
  if (!process.env.OPENAI_API_KEY) return { connected: false, error: "OPENAI_API_KEY not configured" };
  try {
    const r = await callOpenAI({ model: "gpt-4o-mini", messages: [{ role: "user", content: "Say ok" }], maxTokens: 5, timeoutMs: 15000 });
    return r.content ? { connected: true, model: "gpt-4o-mini" } : { connected: false, error: "Empty response" };
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Unknown error";
    return { connected: false, error: msg.replace(/sk-[a-zA-Z0-9\-_]+/g, "[REDACTED]") };
  }
}

export function isOpenAIConfigured(): boolean { return !!process.env.OPENAI_API_KEY; }
