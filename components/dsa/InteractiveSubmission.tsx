"use client";

import { useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import type { AlgorithmTopic } from "@/types/dsa";
import type { Judge0SubmissionResult } from "@/types/judge0";
import { Button } from "@/components/ui/button";

type InteractiveSubmissionProps = {
  topic: AlgorithmTopic;
};

type SubmissionState =
  | { status: "idle"; result?: never; error?: never }
  | { status: "running"; result?: never; error?: never }
  | { status: "success"; result: Judge0SubmissionResult; error?: never }
  | { status: "error"; result?: never; error: string };

function starterCode(topic: AlgorithmTopic) {
  return `import java.util.*;

public class Main {
  public static void main(String[] args) {
    Scanner scanner = new Scanner(System.in);

    // Edit this code and use stdin below for your own test cases.
    System.out.println("${topic.title} interactive example");
    System.out.println("Sample problem: ${topic.example.problem.replaceAll('"', '\\"')}");
    System.out.println("Sample input: ${topic.example.input.replaceAll('"', '\\"')}");
    System.out.println("Expected output: ${topic.example.output.replaceAll('"', '\\"')}");

    if (scanner.hasNextLine()) {
      System.out.println("Your stdin: " + scanner.nextLine());
    }
  }
}`;
}

export function InteractiveSubmission({ topic }: InteractiveSubmissionProps) {
  const shouldReduceMotion = useReducedMotion();
  const initialCode = useMemo(() => starterCode(topic), [topic]);
  const [sourceCode, setSourceCode] = useState(initialCode);
  const [stdin, setStdin] = useState("");
  const [submission, setSubmission] = useState<SubmissionState>({
    status: "idle",
  });

  async function runCode() {
    setSubmission({ status: "running" });

    const response = await fetch("/api/dsa/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        sourceCode,
        stdin,
        languageId: 62,
      }),
    });

    const payload = (await response.json().catch(() => null)) as {
      result?: Judge0SubmissionResult;
      error?: string;
      message?: string;
    } | null;

    if (!response.ok || !payload?.result) {
      setSubmission({
        status: "error",
        error:
          payload?.message ??
          payload?.error ??
          "Submission failed. Check Judge0 configuration.",
      });
      return;
    }

    setSubmission({ status: "success", result: payload.result });
  }

  function resetCode() {
    setSourceCode(initialCode);
    setStdin("");
    setSubmission({ status: "idle" });
  }

  return (
    <motion.section
      initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
      whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.35 }}
      className="overflow-hidden rounded-[2rem] border border-accent/20 bg-surface shadow-2xl shadow-accent/10"
    >
      <div className="relative overflow-hidden border-b border-border p-5 sm:p-6">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,color-mix(in_oklab,var(--accent)_18%,transparent),transparent_34%)]" />
        <div className="relative flex flex-col justify-between gap-4 lg:flex-row lg:items-start">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.24em] text-accent">
              Interactive execution
            </p>
            <h2 className="mt-2 text-2xl font-black tracking-[-0.03em] sm:text-3xl">
              Run Java safely with Judge0
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
              Your portfolio server does not execute Java. It sends this code to
              Judge0, a sandboxed execution service, and returns the result.
            </p>
          </div>
          <div className="grid w-full gap-2 sm:grid-cols-3 lg:w-auto">
            <Badge label="Runtime" value="Java" />
            <Badge label="Language ID" value="62" />
            <Badge label="Mode" value="Sandboxed" />
          </div>
        </div>
      </div>

      <div className="space-y-5 p-4 sm:p-5 lg:p-6">
        <div className="overflow-hidden rounded-3xl border border-border bg-[#050816] shadow-inner">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 px-4 py-3">
            <div className="flex items-center gap-3">
              <div className="flex gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
                <span className="h-2.5 w-2.5 rounded-full bg-yellow-400" />
                <span className="h-2.5 w-2.5 rounded-full bg-green-400" />
              </div>
              <span className="text-xs font-black uppercase tracking-[0.2em] text-white/55">
                Main.java
              </span>
            </div>
            <span className="rounded-full bg-white/10 px-3 py-1 text-[11px] font-black text-white/70">
              Editable starter code
            </span>
          </div>
          <textarea
            id="judge0-source"
            aria-label="Java source code"
            value={sourceCode}
            onChange={(event) => setSourceCode(event.target.value)}
            spellCheck={false}
            className="min-h-[520px] w-full resize-y border-0 bg-transparent p-5 font-mono text-sm leading-7 text-slate-100 outline-none placeholder:text-slate-500 sm:text-[15px] lg:min-h-[620px]"
          />
        </div>

        <div className="grid gap-5 xl:grid-cols-[420px_minmax(0,1fr)]">
          <div className="rounded-3xl border border-border bg-background/70 p-4 sm:p-5">
            <div className="flex items-center justify-between gap-3">
              <label className="text-sm font-black" htmlFor="judge0-stdin">
                Standard input
              </label>
              <span className="text-xs font-bold text-muted-foreground">
                optional
              </span>
            </div>
            <textarea
              id="judge0-stdin"
              value={stdin}
              onChange={(event) => setStdin(event.target.value)}
              placeholder="Example: 5 10 20"
              className="mt-3 min-h-36 w-full resize-y rounded-2xl border border-border bg-surface p-4 font-mono text-sm leading-6 outline-none transition focus:border-accent focus:ring-4 focus:ring-accent/15"
            />

            <div className="mt-4 grid grid-cols-2 gap-3">
              <Button
                type="button"
                onClick={runCode}
                disabled={submission.status === "running"}
                className="w-full rounded-2xl"
              >
                {submission.status === "running" ? "Running..." : "Run Code"}
              </Button>
              <Button
                type="button"
                variant="secondary"
                onClick={resetCode}
                className="w-full rounded-2xl"
              >
                Reset
              </Button>
            </div>

            <p className="mt-4 rounded-2xl bg-accent/10 p-4 text-xs font-semibold leading-5 text-accent">
              Execution is rate-limited by your Judge0 provider. Keep portfolio
              examples small and deterministic.
            </p>
          </div>

          <div className="rounded-3xl border border-border bg-background/70 p-4 sm:p-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-sm font-black">Execution result</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  stdout, compile output, runtime errors, time, and memory
                </p>
              </div>
              <StatusPill submission={submission} />
            </div>

            <div className="mt-4">
              {submission.status === "idle" ? <EmptyResult /> : null}
              {submission.status === "running" ? <RunningResult /> : null}
              {submission.status === "error" ? (
                <p className="rounded-2xl border border-red-500/30 bg-red-500/10 p-4 text-sm leading-6 text-red-500">
                  {submission.error}
                </p>
              ) : null}
              {submission.status === "success" ? (
                <div className="space-y-4">
                  <div className="grid gap-3 text-xs sm:grid-cols-2 xl:grid-cols-4">
                    <Metric
                      label="Status"
                      value={submission.result.status.description}
                    />
                    <Metric
                      label="Time"
                      value={submission.result.time ?? "n/a"}
                    />
                    <Metric
                      label="Memory"
                      value={
                        submission.result.memory
                          ? `${submission.result.memory} KB`
                          : "n/a"
                      }
                    />
                    <Metric
                      label="Token"
                      value={submission.result.token ?? "n/a"}
                    />
                  </div>
                  <OutputBlock
                    label="stdout"
                    value={submission.result.stdout ?? ""}
                  />
                  <OutputBlock
                    label="compile output"
                    value={submission.result.compileOutput ?? ""}
                  />
                  <OutputBlock
                    label="stderr"
                    value={submission.result.stderr ?? ""}
                  />
                  <OutputBlock
                    label="message"
                    value={submission.result.message ?? ""}
                  />
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}

function Badge({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-border bg-background/70 px-4 py-3">
      <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">
        {label}
      </p>
      <p className="mt-1 text-sm font-black text-foreground">{value}</p>
    </div>
  );
}

function StatusPill({ submission }: { submission: SubmissionState }) {
  const label =
    submission.status === "running"
      ? "Running"
      : submission.status === "success"
        ? submission.result.status.description
        : submission.status === "error"
          ? "Failed"
          : "Idle";

  return (
    <span className="rounded-full bg-accent/10 px-3 py-1 text-xs font-black text-accent">
      {label}
    </span>
  );
}

function EmptyResult() {
  return (
    <div className="rounded-2xl border border-dashed border-border bg-surface/60 p-6 text-center">
      <p className="text-sm font-black">No run yet</p>
      <p className="mt-2 text-sm leading-6 text-muted-foreground">
        Edit the Java code, optionally add stdin, then run it through Judge0.
      </p>
    </div>
  );
}

function RunningResult() {
  return (
    <div className="rounded-2xl border border-accent/30 bg-accent/10 p-5">
      <div className="flex items-center gap-3">
        <span className="h-3 w-3 animate-pulse rounded-full bg-accent" />
        <p className="text-sm font-black text-accent">
          Judge0 is executing your code...
        </p>
      </div>
      <div className="mt-4 h-2 overflow-hidden rounded-full bg-accent/15">
        <motion.div
          className="h-full rounded-full bg-accent"
          initial={{ width: "10%" }}
          animate={{ width: ["10%", "85%", "35%"] }}
          transition={{ duration: 1.2, repeat: Infinity }}
        />
      </div>
    </div>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-border bg-surface p-3">
      <p className="font-black text-muted-foreground">{label}</p>
      <p className="mt-1 break-words font-bold text-foreground">{value}</p>
    </div>
  );
}

function OutputBlock({ label, value }: { label: string; value: string }) {
  if (!value) {
    return null;
  }

  return (
    <div>
      <p className="text-xs font-black uppercase tracking-[0.18em] text-muted-foreground">
        {label}
      </p>
      <pre className="mt-2 max-h-48 overflow-auto rounded-xl bg-[#050816] p-3 text-xs leading-6 text-slate-100">
        <code>{value}</code>
      </pre>
    </div>
  );
}
