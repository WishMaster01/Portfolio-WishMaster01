"use client";

import mermaid from "mermaid";
import { useEffect, useId, useState } from "react";

type MermaidRendererProps = {
  definition: string;
};

function readThemeColor(variable: string, fallback: string) {
  if (typeof window === "undefined") {
    return fallback;
  }

  const value = getComputedStyle(document.documentElement)
    .getPropertyValue(variable)
    .trim();

  if (!value) {
    return fallback;
  }

  if (value.includes(" ")) {
    return `rgb(${value})`;
  }

  return value;
}

export function MermaidRenderer({ definition }: MermaidRendererProps) {
  const reactId = useId();
  const [svg, setSvg] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function renderDiagram() {
      try {
        setError("");
        mermaid.initialize({
          startOnLoad: false,
          securityLevel: "strict",
          theme: "base",
          themeVariables: {
            background: "transparent",
            primaryColor: readThemeColor("--surface", "#111827"),
            primaryTextColor: readThemeColor("--foreground", "#f8fafc"),
            primaryBorderColor: readThemeColor("--border", "#334155"),
            lineColor: readThemeColor("--accent", "#7c3aed"),
            secondaryColor: readThemeColor("--surface-elevated", "#1f2937"),
            tertiaryColor: readThemeColor("--background", "#020617"),
            fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif",
          },
        });

        const id = `architecture-${reactId.replaceAll(":", "")}`;
        const result = await mermaid.render(id, definition);

        if (!cancelled) {
          setSvg(result.svg);
        }
      } catch (renderError) {
        if (!cancelled) {
          setSvg("");
          setError(
            renderError instanceof Error
              ? renderError.message
              : "Unable to render diagram.",
          );
        }
      }
    }

    void renderDiagram();

    return () => {
      cancelled = true;
    };
  }, [definition, reactId]);

  if (error) {
    return (
      <div className="rounded-2xl border border-destructive/30 bg-destructive/10 p-4">
        <p className="text-sm font-black text-destructive">
          Mermaid render failed
        </p>
        <p className="mt-2 text-xs leading-6 text-muted-foreground">{error}</p>
        <pre className="mt-4 overflow-x-auto rounded-xl bg-background/80 p-4 text-xs leading-6 text-foreground">
          {definition}
        </pre>
      </div>
    );
  }

  if (!svg) {
    return (
      <div className="h-80 animate-pulse rounded-3xl border border-border bg-surface-elevated" />
    );
  }

  return (
    <div
      className="mermaid-diagram min-w-[760px] [&_svg]:mx-auto [&_svg]:h-auto [&_svg]:max-w-full"
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}
