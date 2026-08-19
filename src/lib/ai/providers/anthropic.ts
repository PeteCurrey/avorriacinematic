/**
 * AVORRIA — ANTHROPIC PROVIDER
 * Native fetch-based. No SDK. Server-side only.
 * Phase 2: wired but not used by Scout.
 * Phase 3: Creative Director will use this actively.
 */

export interface AnthropicCallParams {
  model: string;
  messages: { role: "user" | "assistant"; content: string }[];
  systemPrompt?: string;
  temperature?: number;
  maxTokens?: number;
  timeoutMs?: number;
}

export interface AnthropicCallResult {
  content: string;
  inputTokens: number;
  outputTokens: number;
  latencyMs: number;
  estimatedCost: number;
}

const COST_INPUT: Record<string, number> = { "claude-sonnet-4-5": 0.000003, "claude-opus-4-5": 0.000015 };
const COST_OUTPUT: Record<string, number> = { "claude-sonnet-4-5": 0.000015, "claude-opus-4-5": 0.000075 };

export async function callAnthropic(params: AnthropicCallParams): Promise<AnthropicCallResult> {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) throw new Error("ANTHROPIC_API_KEY not configured");

  const { model, messages, systemPrompt, temperature = 0.5, maxTokens = 8192, timeoutMs = 90000 } = params;
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  const startTime = Date.now();

  const body: Record<string, unknown> = { model, messages, max_tokens: maxTokens, temperature };
  if (systemPrompt) body.system = systemPrompt;

  try {
    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: { "x-api-key": apiKey, "anthropic-version": "2023-06-01", "content-type": "application/json" },
      body: JSON.stringify(body),
      signal: controller.signal,
    });
    clearTimeout(timer);
    const latencyMs = Date.now() - startTime;

    if (!res.ok) {
      const txt = await res.text().catch(() => "unknown");
      throw new Error(`Anthropic API error ${res.status}: ${txt.slice(0, 200)}`);
    }

    const data = (await res.json()) as {
      content?: unknown[];
      usage?: { input_tokens?: number; output_tokens?: number };
    };
    const blocks: unknown[] = data.content ?? [];
    const content = blocks
      .filter((b: unknown): b is Record<string, unknown> => !!b && typeof b === "object" && (b as Record<string, unknown>).type === "text")
      .map((b: Record<string, unknown>) => String(b.text ?? ""))
      .join("\n");
    const usage = data.usage ?? {};
    const inputTokens  = Number(usage.input_tokens)  || 0;
    const outputTokens = Number(usage.output_tokens) || 0;
    const estimatedCost = inputTokens * (COST_INPUT[model] ?? 0.000003) + outputTokens * (COST_OUTPUT[model] ?? 0.000015);
    return { content, inputTokens, outputTokens, latencyMs, estimatedCost };
  } catch (err) {
    clearTimeout(timer);
    if (err instanceof Error && err.name === "AbortError") throw new Error(`Anthropic timed out after ${timeoutMs}ms`);
    throw err;
  }
}

export interface AnthropicConnectionStatus { connected: boolean; model?: string; error?: string; }

export async function checkAnthropicConnection(): Promise<AnthropicConnectionStatus> {
  if (!process.env.ANTHROPIC_API_KEY) return { connected: false, error: "ANTHROPIC_API_KEY not configured" };
  try {
    const r = await callAnthropic({ model: "claude-sonnet-4-5", messages: [{ role: "user", content: "Say ok" }], maxTokens: 10, timeoutMs: 15000 });
    return r.content ? { connected: true, model: "claude-sonnet-4-5" } : { connected: false, error: "Empty response" };
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Unknown error";
    return { connected: false, error: msg.replace(/sk-ant-[a-zA-Z0-9\-_]+/g, "[REDACTED]") };
  }
}

export function isAnthropicConfigured(): boolean { return !!process.env.ANTHROPIC_API_KEY; }
