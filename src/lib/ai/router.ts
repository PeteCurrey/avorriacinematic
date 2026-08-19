/**
 * AVORRIA — AI TASK ROUTER
 *
 * The ONLY place application code calls AI providers.
 * Never call callOpenAI / callAnthropic directly from components or actions.
 *
 * Usage:
 *   import { runAITask } from "@/lib/ai/router";
 *   const result = await runAITask({ task: "website_analysis", payload: signals });
 */

import type { AITaskInput, AITaskOutput, TaskKey, AIProvider } from "@/lib/ai/types";
import { callOpenAI } from "@/lib/ai/providers/openai";
import { callAnthropic } from "@/lib/ai/providers/anthropic";
import { recordAIUsage } from "@/lib/db/repository";

export { isOpenAIConfigured } from "@/lib/ai/providers/openai";
export { isAnthropicConfigured } from "@/lib/ai/providers/anthropic";

// ============================================================================
// DEFAULT TASK ROUTING TABLE
// ============================================================================

interface TaskDefaults {
  provider: AIProvider;
  model: string;
  webSearch?: boolean;
  responseFormat?: "json_object" | "text";
  temperature?: number;
  maxTokens?: number;
  timeoutSeconds: number;
  maxRetries: number;
  fallbackProvider?: AIProvider;
  fallbackModel?: string;
}

const DEFAULT_TASK_CONFIGS: Record<TaskKey, TaskDefaults> = {
  business_discovery:     { provider: "openai", model: "gpt-4o",      webSearch: true,  responseFormat: "json_object", temperature: 0.3, maxTokens: 4096, timeoutSeconds: 90, maxRetries: 2 },
  business_normalisation: { provider: "openai", model: "gpt-4o-mini", webSearch: false, responseFormat: "json_object", temperature: 0.1, maxTokens: 2048, timeoutSeconds: 30, maxRetries: 2 },
  business_verification:  { provider: "openai", model: "gpt-4o-mini", webSearch: true,  responseFormat: "json_object", temperature: 0.2, maxTokens: 2048, timeoutSeconds: 45, maxRetries: 2 },
  website_analysis:       { provider: "openai", model: "gpt-4o",      webSearch: false, responseFormat: "json_object", temperature: 0.3, maxTokens: 3000, timeoutSeconds: 60, maxRetries: 2 },
  prospect_qualification: { provider: "openai", model: "gpt-4o",      webSearch: false, responseFormat: "json_object", temperature: 0.2, maxTokens: 2000, timeoutSeconds: 45, maxRetries: 2 },
  prospect_summary:       { provider: "openai", model: "gpt-4o-mini", webSearch: false, responseFormat: "text",        temperature: 0.3, maxTokens: 1000, timeoutSeconds: 30, maxRetries: 2 },
  additional_research:    { provider: "openai", model: "gpt-4o",      webSearch: true,  responseFormat: "json_object", temperature: 0.3, maxTokens: 4096, timeoutSeconds: 90, maxRetries: 2 },
  deep_research:          { provider: "openai", model: "gpt-4o",      webSearch: true,  responseFormat: "json_object", temperature: 0.3, maxTokens: 6000, timeoutSeconds: 120, maxRetries: 1 },
  // Phase 3 — Anthropic Creative Intelligence (not active in Phase 2)
  creative_direction:     { provider: "anthropic", model: "claude-sonnet-4-5", webSearch: false, responseFormat: "json_object", temperature: 0.7, maxTokens: 8192, timeoutSeconds: 120, maxRetries: 1 },
  design_generation:      { provider: "anthropic", model: "claude-sonnet-4-5", webSearch: false, responseFormat: "text",        temperature: 0.7, maxTokens: 8192, timeoutSeconds: 120, maxRetries: 1 },
  visual_qa:              { provider: "anthropic", model: "claude-sonnet-4-5", webSearch: false, responseFormat: "json_object", temperature: 0.3, maxTokens: 4096, timeoutSeconds: 90,  maxRetries: 2 },
  // Phase 4 — Outreach
  outreach_copy:          { provider: "openai", model: "gpt-4o",      webSearch: false, responseFormat: "text",        temperature: 0.5, maxTokens: 2000, timeoutSeconds: 45, maxRetries: 2 },
  reply_classification:   { provider: "openai", model: "gpt-4o-mini", webSearch: false, responseFormat: "json_object", temperature: 0.1, maxTokens: 500,  timeoutSeconds: 20, maxRetries: 3 },
};

// ============================================================================
// MAIN ROUTER
// ============================================================================

export async function runAITask<TInput = Record<string, unknown>, TOutput = Record<string, unknown>>(
  input: AITaskInput<TInput>
): Promise<AITaskOutput<TOutput>> {
  const defaults = DEFAULT_TASK_CONFIGS[input.task];
  const provider = input.forceProvider ?? defaults.provider;
  const model    = input.forceModel    ?? defaults.model;

  return executeWithRetry<TInput, TOutput>(input, provider, model, defaults, false);
}

async function executeWithRetry<TInput, TOutput>(
  input: AITaskInput<TInput>,
  provider: AIProvider,
  model: string,
  defaults: TaskDefaults,
  isFallback: boolean
): Promise<AITaskOutput<TOutput>> {
  const maxRetries = defaults.maxRetries;
  let lastError: string = "Unknown error";

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    const delayMs = attempt > 0 ? Math.min(1000 * Math.pow(2, attempt - 1), 8000) : 0;
    if (delayMs > 0) await new Promise(r => setTimeout(r, delayMs));

    const startTime = Date.now();

    try {
      let content: string;
      let usage: AITaskOutput<TOutput>["usage"];

      if (provider === "openai") {
        // Build messages from payload
        const messages = buildOpenAIMessages(input.task, input.payload);
        const result = await callOpenAI({
          model,
          messages,
          responseFormat: defaults.responseFormat === "json_object" ? "json_object" : "text",
          temperature: defaults.temperature,
          maxTokens: defaults.maxTokens,
          webSearch: defaults.webSearch,
          timeoutMs: defaults.timeoutSeconds * 1000,
        });
        content = result.content;
        usage = {
          inputTokens:   result.inputTokens,
          outputTokens:  result.outputTokens,
          cachedTokens:  result.cachedTokens,
          searchCalls:   result.searchCalls,
          latencyMs:     result.latencyMs,
          estimatedCost: result.estimatedCost,
        };
      } else {
        // Anthropic
        const { system, user } = buildAnthropicMessages(input.task, input.payload);
        const result = await callAnthropic({
          model,
          messages: [{ role: "user", content: user }],
          systemPrompt: system,
          temperature: defaults.temperature,
          maxTokens: defaults.maxTokens,
          timeoutMs: defaults.timeoutSeconds * 1000,
        });
        content = result.content;
        usage = {
          inputTokens:   result.inputTokens,
          outputTokens:  result.outputTokens,
          latencyMs:     result.latencyMs,
          estimatedCost: result.estimatedCost,
        };
      }

      // Parse result
      let result: TOutput | undefined;
      if (defaults.responseFormat === "json_object" && content) {
        try {
          result = JSON.parse(content) as TOutput;
        } catch {
          throw new Error(`Invalid JSON in model response: ${content.slice(0, 100)}`);
        }
      } else {
        result = content as unknown as TOutput;
      }

      // Record usage (non-blocking, best effort)
      void recordAIUsage({
        provider,
        model,
        task_key: input.task,
        entity_type: input.entityType,
        entity_id: input.entityId,
        automation_job_id: input.jobId,
        input_tokens:  usage.inputTokens,
        output_tokens: usage.outputTokens,
        cached_tokens: usage.cachedTokens,
        search_calls:  usage.searchCalls,
        latency_ms:    usage.latencyMs,
        success: true,
        estimated_cost: usage.estimatedCost,
      }).catch(() => {/* intentionally silent */});

      return { success: true, result, provider, model, usedFallback: isFallback, usage };

    } catch (err) {
      lastError = err instanceof Error ? err.message : "Unknown error";
      const isTransient = isTransientError(lastError);

      // Record failed usage
      const latencyMs = Date.now() - startTime;
      void recordAIUsage({
        provider, model, task_key: input.task,
        entity_type: input.entityType, entity_id: input.entityId, automation_job_id: input.jobId,
        input_tokens: 0, output_tokens: 0, latency_ms: latencyMs,
        success: false, error_code: lastError.slice(0, 50), estimated_cost: 0,
      }).catch(() => {/* intentionally silent */});

      if (!isTransient || attempt === maxRetries) break;
    }
  }

  // Try fallback if configured and not already a fallback
  if (!isFallback && defaults.fallbackProvider && defaults.fallbackModel) {
    return executeWithRetry<TInput, TOutput>(
      input, defaults.fallbackProvider, defaults.fallbackModel, { ...defaults, maxRetries: 1 }, true
    );
  }

  return {
    success: false,
    error: lastError,
    provider,
    model,
    usedFallback: isFallback,
    usage: { inputTokens: 0, outputTokens: 0, latencyMs: 0, estimatedCost: 0 },
  };
}

function isTransientError(message: string): boolean {
  return message.includes("429") || message.includes("503") || message.includes("timeout") || message.includes("timed out") || message.includes("ECONNRESET");
}

// ============================================================================
// MESSAGE BUILDERS
// Payload-to-message conversion. Keeps AI logic centralized.
// ============================================================================

import { PROMPTS } from "@/lib/ai/prompts";
import type { OpenAIMessage } from "@/lib/ai/types";

function buildOpenAIMessages(task: TaskKey, payload: unknown): OpenAIMessage[] {
  const p = payload as Record<string, unknown>;

  switch (task) {
    case "business_discovery": {
      const profile = p as { sectors?: string[]; cities?: string[]; countries?: string[]; radius_km?: number; notes?: string };
      const userMsg = PROMPTS.DISCOVERY_V1.userTemplate({
        sectors: profile.sectors ?? [],
        cities: profile.cities ?? [],
        countries: profile.countries ?? ["GB"],
        radius_km: profile.radius_km ?? 50,
        notes: typeof profile.notes === "string" ? profile.notes : undefined,
      });
      return [
        { role: "system", content: PROMPTS.DISCOVERY_V1.system },
        { role: "user", content: userMsg },
      ];
    }

    case "website_analysis": {
      const { signals, companyName, screenshotBase64 } = p as {
        signals: Parameters<typeof PROMPTS.WEBSITE_ANALYSIS_V1.userTemplate>[0];
        companyName: string;
        screenshotBase64?: string;
      };
      const msgs = PROMPTS.WEBSITE_ANALYSIS_V1.userTemplate(signals, companyName, screenshotBase64);
      return [{ role: "system", content: PROMPTS.WEBSITE_ANALYSIS_V1.system }, ...msgs];
    }

    case "prospect_qualification": {
      const { business, assessment } = p as {
        business: Parameters<typeof PROMPTS.QUALIFICATION_V1.userTemplate>[0];
        assessment: Parameters<typeof PROMPTS.QUALIFICATION_V1.userTemplate>[1];
      };
      return [
        { role: "system", content: PROMPTS.QUALIFICATION_V1.system },
        { role: "user", content: PROMPTS.QUALIFICATION_V1.userTemplate(business, assessment) },
      ];
    }

    case "deep_research": {
      const business = p as Parameters<typeof PROMPTS.DEEP_RESEARCH_V1.userTemplate>[0];
      return [
        { role: "system", content: PROMPTS.DEEP_RESEARCH_V1.system },
        { role: "user", content: PROMPTS.DEEP_RESEARCH_V1.userTemplate(business) },
      ];
    }

    case "additional_research": {
      const { business, existingAssessment } = p as {
        business: Parameters<typeof PROMPTS.ADDITIONAL_RESEARCH_V1.userTemplate>[0];
        existingAssessment: Parameters<typeof PROMPTS.ADDITIONAL_RESEARCH_V1.userTemplate>[1];
      };
      return [
        { role: "system", content: PROMPTS.ADDITIONAL_RESEARCH_V1.system },
        { role: "user", content: PROMPTS.ADDITIONAL_RESEARCH_V1.userTemplate(business, existingAssessment) },
      ];
    }

    default: {
      // Generic fallback — pass payload as JSON in user message
      return [{ role: "user", content: JSON.stringify(payload) }];
    }
  }
}

function buildAnthropicMessages(task: TaskKey, payload: unknown): { system: string; user: string } {
  // Phase 3 will expand this with proper creative prompts
  return {
    system: `You are an AI assistant for Avorria. Task: ${task}.`,
    user: JSON.stringify(payload),
  };
}
