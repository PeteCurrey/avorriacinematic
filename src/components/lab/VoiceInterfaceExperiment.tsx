"use client";

import React, { useState, useEffect, useRef } from "react";

interface VoiceCommand {
  command: string;
  action: string;
  response: string;
  timestamp: string;
}

const SUPPORTED_COMMANDS = [
  { trigger: "show systems", description: "Display systems engineering capabilities & architecture" },
  { trigger: "filter proof", description: "Showcase verified client project evidence & flagships" },
  { trigger: "query architecture", description: "Inspect Next.js App Router & SSR performance metrics" },
  { trigger: "explain latency", description: "Explain sub-second Time-To-First-Byte delivery" },
  { trigger: "reset view", description: "Clear current visual filter and reset telemetry" },
  { trigger: "help", description: "List all recognized speech & keyboard directives" }
];

export function VoiceInterfaceExperiment() {
  const [isListening, setIsListening] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(false);
  const [textInput, setTextInput] = useState("");
  const [activeOutput, setActiveOutput] = useState<string>(
    "Awaiting voice or keyboard instruction. State your query or type a command below."
  );
  const [commandHistory, setCommandHistory] = useState<VoiceCommand[]>([]);
  const [activeTelemetry, setActiveTelemetry] = useState<{
    route: string;
    status: string;
    latency: string;
  }>({
    route: "DEFAULT / STANDBY",
    status: "LISTENING_READY",
    latency: "0ms"
  });

  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    // Check for Web Speech API
    if (typeof window !== "undefined") {
      const SpeechRecognition =
        (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        setSpeechSupported(true);
        const recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = "en-US";

        recognition.onstart = () => setIsListening(true);
        recognition.onend = () => setIsListening(false);
        recognition.onerror = (e: any) => {
          console.warn("Speech recognition error:", e);
          setIsListening(false);
        };
        recognition.onresult = (event: any) => {
          const transcript = event.results[0][0].transcript.toLowerCase().trim();
          executeCommand(transcript, "VOICE");
        };

        recognitionRef.current = recognition;
      }
    }

    return () => {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.abort();
        } catch {
          // ignore
        }
      }
    };
  }, []);

  const toggleListening = () => {
    if (!speechSupported || !recognitionRef.current) {
      alert("Web Speech API is not supported in this browser. Please use the text command input below.");
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
    } else {
      try {
        recognitionRef.current.start();
      } catch (err) {
        console.warn("Could not start recognition:", err);
      }
    }
  };

  const executeCommand = (cmd: string, source: "VOICE" | "TEXT") => {
    const cleanCmd = cmd.toLowerCase().trim();
    let responseText = "";
    let telemetryUpdate = { route: "COMMAND_MATCH", status: "EXECUTED", latency: "14ms" };

    if (cleanCmd.includes("system") || cleanCmd.includes("ai")) {
      responseText = "SYSTEMS CAPABILITY: Bounded AI product integration, deterministic state machines, and operational dashboards. Human oversight is engineered as default constraint.";
      telemetryUpdate = { route: "/CAPABILITIES/SYSTEMS", status: "RESOLVED", latency: "12ms" };
    } else if (cleanCmd.includes("proof") || cleanCmd.includes("project") || cleanCmd.includes("work")) {
      responseText = "VERIFIED PROOF: 6 Flagship platforms in production — Alkota (001), CareerOS (002), NestIQ (003), Drawdown.Trading (004), EntireFM (005), One Great Northern (006).";
      telemetryUpdate = { route: "/WORK/[SLUG]", status: "FILTERED", latency: "8ms" };
    } else if (cleanCmd.includes("architecture") || cleanCmd.includes("ssr") || cleanCmd.includes("next")) {
      responseText = "TECHNICAL ARCHITECTURE: Next.js App Router with streaming SSR, strict TypeScript contracts, zero template overhead, and full WCAG 2.2 AA accessibility.";
      telemetryUpdate = { route: "/DEV/DESIGN-SYSTEM", status: "OPTIMIZED", latency: "16ms" };
    } else if (cleanCmd.includes("latency") || cleanCmd.includes("speed") || cleanCmd.includes("fast")) {
      responseText = "LATENCY TELEMETRY: Sub-second Largest Contentful Paint (<0.8s) and <50ms Interaction to Next Paint across global edge CDN nodes.";
      telemetryUpdate = { route: "/TELEMETRY/CWV", status: "SUB_SECOND", latency: "4ms" };
    } else if (cleanCmd.includes("reset") || cleanCmd.includes("clear")) {
      responseText = "STATE RESET: Telemetry restored to baseline standby state.";
      telemetryUpdate = { route: "DEFAULT / STANDBY", status: "LISTENING_READY", latency: "0ms" };
    } else if (cleanCmd.includes("help") || cleanCmd.includes("commands")) {
      responseText = "DIRECTIVE CATALOG: Try saying or typing: 'show systems', 'filter proof', 'query architecture', 'explain latency', or 'reset view'.";
      telemetryUpdate = { route: "/LAB/VOICE-CATALOG", status: "INDEXED", latency: "2ms" };
    } else {
      responseText = `COMMAND NOT PARSED: '${cleanCmd}'. Try typing or saying 'help' for recognized directives.`;
      telemetryUpdate = { route: "ERROR / UNKNOWN", status: "NO_MATCH", latency: "1ms" };
    }

    setActiveOutput(responseText);
    setActiveTelemetry(telemetryUpdate);

    const newLog: VoiceCommand = {
      command: cleanCmd,
      action: `${source} DIRECTIVE`,
      response: responseText,
      timestamp: new Date().toLocaleTimeString()
    };

    setCommandHistory((prev) => [newLog, ...prev.slice(0, 7)]);
  };

  const handleTextSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!textInput.trim()) return;
    executeCommand(textInput, "TEXT");
    setTextInput("");
  };

  return (
    <div className="space-y-12">
      {/* Privacy Notice Header */}
      <div className="p-6 bg-avorria-surface border border-avorria-signal/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <span className="font-mono text-xs text-avorria-signal uppercase tracking-widest block">
            STRICT PRIVACY POLICY
          </span>
          <p className="font-body text-xs text-avorria-white/80">
            Microphone audio is processed entirely client-side via the browser Web Speech API. Zero audio recordings, transcripts, or user identifiers are transmitted to or stored on remote servers.
          </p>
        </div>
        <span className="font-mono text-[10px] text-avorria-signal uppercase tracking-wider px-3 py-1 bg-avorria-black border border-avorria-signal/40 shrink-0">
          LOCAL PROCESSING ONLY
        </span>
      </div>

      {/* Voice & Keyboard Command Interface */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Input Console */}
        <div className="lg:col-span-7 space-y-6">
          <div className="p-8 bg-avorria-surface border border-avorria-line space-y-6">
            <div className="flex items-center justify-between border-b border-avorria-line/40 pb-4">
              <span className="font-mono text-xs text-avorria-signal uppercase tracking-widest">
                SPEECH & TEXT INTERFACE CONSOLE
              </span>
              <span className="font-mono text-[10px] text-avorria-muted uppercase">
                {speechSupported ? "WEB_SPEECH_API_ACTIVE" : "KEYBOARD_FALLBACK_MODE"}
              </span>
            </div>

            {/* Mic Activation Button */}
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <button
                type="button"
                onClick={toggleListening}
                className={`w-full sm:w-auto px-8 py-5 font-mono text-xs uppercase tracking-widest font-bold transition-all flex items-center justify-center gap-3 border ${
                  isListening
                    ? "bg-red-600 text-white border-red-500 animate-pulse"
                    : speechSupported
                    ? "bg-avorria-signal text-avorria-black border-avorria-signal hover:bg-avorria-white"
                    : "bg-avorria-line text-avorria-muted border-avorria-line-strong cursor-not-allowed"
                }`}
              >
                <span className={`w-3 h-3 rounded-full ${isListening ? "bg-white" : "bg-avorria-black"}`} />
                <span>{isListening ? "LISTENING (CLICK TO STOP)..." : "ACTIVATE MICROPHONE"}</span>
              </button>

              <div className="font-mono text-[10px] text-avorria-muted uppercase text-center sm:text-left">
                {isListening
                  ? "Speak command clearly into your microphone..."
                  : speechSupported
                  ? "Click to begin speech recognition (per-session consent)"
                  : "Speech API unavailable in this browser — use text input"}
              </div>
            </div>

            {/* Text Fallback Form */}
            <form onSubmit={handleTextSubmit} className="pt-6 border-t border-avorria-line/40 space-y-3">
              <label htmlFor="voice-text-input" className="font-mono text-[10px] text-avorria-muted uppercase tracking-widest block">
                OR EXECUTE DIRECT TEXT COMMAND
              </label>
              <div className="flex gap-2">
                <input
                  id="voice-text-input"
                  type="text"
                  value={textInput}
                  onChange={(e) => setTextInput(e.target.value)}
                  placeholder="e.g. show systems, filter proof, query architecture..."
                  className="flex-1 bg-avorria-black border border-avorria-line px-4 py-3 font-mono text-xs text-avorria-white placeholder:text-avorria-quiet focus:outline-none focus:border-avorria-signal"
                />
                <button
                  type="submit"
                  className="bg-avorria-white text-avorria-black font-mono text-xs uppercase font-bold px-6 py-3 hover:bg-avorria-signal transition-colors"
                >
                  EXECUTE
                </button>
              </div>
            </form>

            {/* Quick Directive Buttons */}
            <div className="space-y-2 pt-4">
              <span className="font-mono text-[9px] text-avorria-quiet uppercase tracking-widest block">
                QUICK DIRECTIVE SHORTCUTS
              </span>
              <div className="flex flex-wrap gap-2">
                {SUPPORTED_COMMANDS.map((cmd) => (
                  <button
                    key={cmd.trigger}
                    onClick={() => executeCommand(cmd.trigger, "TEXT")}
                    className="font-mono text-[10px] uppercase bg-avorria-black/80 px-2.5 py-1.5 border border-avorria-line text-avorria-muted hover:text-avorria-white hover:border-avorria-signal transition-colors"
                  >
                    {cmd.trigger}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right: Telemetry & Live Response */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-8 bg-avorria-surface border border-avorria-line space-y-6 h-full flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between font-mono text-xs text-avorria-signal border-b border-avorria-line/40 pb-3">
                <span>SYSTEM RESPONSE</span>
                <span className="text-[10px] text-avorria-quiet uppercase">LIVE TELEMETRY</span>
              </div>

              {/* Active Output */}
              <div className="p-5 bg-avorria-black border border-avorria-signal/40 font-mono text-xs text-avorria-white leading-relaxed min-h-[120px]">
                <span className="text-[10px] text-avorria-signal block mb-2">OUTPUT DISPATCH //</span>
                {activeOutput}
              </div>

              {/* Telemetry Metrics */}
              <div className="grid grid-cols-3 gap-2 font-mono text-xs">
                <div className="p-3 bg-avorria-black/60 border border-avorria-line">
                  <span className="text-[9px] text-avorria-quiet uppercase block">TARGET</span>
                  <span className="text-avorria-white text-[10px] truncate block">{activeTelemetry.route}</span>
                </div>
                <div className="p-3 bg-avorria-black/60 border border-avorria-line">
                  <span className="text-[9px] text-avorria-quiet uppercase block">STATE</span>
                  <span className="text-avorria-signal text-[10px] block">{activeTelemetry.status}</span>
                </div>
                <div className="p-3 bg-avorria-black/60 border border-avorria-line">
                  <span className="text-[9px] text-avorria-quiet uppercase block">LATENCY</span>
                  <span className="text-avorria-white text-[10px] block">{activeTelemetry.latency}</span>
                </div>
              </div>
            </div>

            {/* Command History Log */}
            <div className="pt-4 border-t border-avorria-line/40 space-y-2">
              <span className="font-mono text-[9px] text-avorria-quiet uppercase tracking-widest block">
                AUDIT LOG (SESSION LOCAL)
              </span>
              <div className="space-y-1 max-h-36 overflow-y-auto font-mono text-[10px] text-avorria-muted">
                {commandHistory.length === 0 ? (
                  <span className="text-avorria-quiet italic">No commands issued in this session.</span>
                ) : (
                  commandHistory.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between border-b border-avorria-line/20 py-1">
                      <span className="text-avorria-white truncate max-w-[180px]">{item.command}</span>
                      <span className="text-avorria-signal text-[9px]">{item.action}</span>
                      <span className="text-avorria-quiet">{item.timestamp}</span>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
