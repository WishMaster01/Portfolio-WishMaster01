import { PriorityQueue } from "@/lib/algorithms/priority-queue";
import type { Judge0SubmissionResult } from "@/types/judge0";

type Judge0Response = {
  token?: string;
  stdout?: string | null;
  stderr?: string | null;
  compile_output?: string | null;
  message?: string | null;
  status?: {
    id?: number;
    description?: string;
  };
  time?: string | null;
  memory?: number | null;
};

type Judge0SubmissionInput = {
  sourceCode: string;
  stdin: string;
  languageId: number;
};

type Judge0SubmissionOutcome =
  | {
      error: string;
      message: string;
      status: number;
    }
  | {
      result: Judge0SubmissionResult;
    };

type PendingJob = {
  input: Judge0SubmissionInput;
  priority: number;
  sequence: number;
  resolve: (value: Judge0SubmissionOutcome) => void;
  reject: (reason?: unknown) => void;
};

const submissionQueue = new PriorityQueue<PendingJob>(
  (left, right) => left.priority - right.priority || left.sequence - right.sequence,
);
let activeExecution = false;
let sequenceCounter = 0;

function getJudge0Config() {
  const baseUrl = process.env.JUDGE0_API_URL;

  if (!baseUrl) {
    return null;
  }

  return {
    baseUrl: baseUrl.replace(/\/$/, ""),
    apiKey: process.env.JUDGE0_API_KEY,
    apiHost: process.env.JUDGE0_API_HOST,
  };
}

function judge0Headers(config: NonNullable<ReturnType<typeof getJudge0Config>>) {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (config.apiKey && config.apiHost) {
    headers["X-RapidAPI-Key"] = config.apiKey;
    headers["X-RapidAPI-Host"] = config.apiHost;
  } else if (config.apiKey) {
    headers["X-Auth-Token"] = config.apiKey;
  }

  return headers;
}

function mapJudge0Response(payload: Judge0Response): Judge0SubmissionResult {
  return {
    token: payload.token,
    stdout: payload.stdout ?? null,
    stderr: payload.stderr ?? null,
    compileOutput: payload.compile_output ?? null,
    message: payload.message ?? null,
    status: {
      id: payload.status?.id ?? 0,
      description: payload.status?.description ?? "Unknown",
    },
    time: payload.time ?? null,
    memory: typeof payload.memory === "number" ? payload.memory : null,
  };
}

function computeSubmissionPriority(input: Judge0SubmissionInput) {
  const languagePenalty = input.languageId === 71 ? 0 : 5;
  return input.sourceCode.length + input.stdin.length + languagePenalty;
}

async function executeJudge0Submission(
  input: Judge0SubmissionInput,
): Promise<Judge0SubmissionOutcome> {
  const config = getJudge0Config();

  if (!config) {
    return {
      error: "Judge0 is not configured.",
      message:
        "Set JUDGE0_API_URL and optionally JUDGE0_API_KEY/JUDGE0_API_HOST in .env.",
      status: 503,
    };
  }

  const url = new URL(`${config.baseUrl}/submissions`);
  url.searchParams.set("base64_encoded", "false");
  url.searchParams.set("wait", "true");
  url.searchParams.set(
    "fields",
    "token,stdout,stderr,compile_output,message,status,time,memory",
  );

  const response = await fetch(url, {
    method: "POST",
    headers: judge0Headers(config),
    body: JSON.stringify({
      source_code: input.sourceCode,
      stdin: input.stdin,
      language_id: input.languageId,
      cpu_time_limit: 4,
      wall_time_limit: 8,
      memory_limit: 128000,
    }),
    cache: "no-store",
  });

  const payload = (await response.json().catch(() => null)) as
    | Judge0Response
    | { error?: string; message?: string }
    | null;

  if (!response.ok) {
    return {
      error: "Judge0 submission failed.",
      message:
        (payload && "message" in payload && payload.message) ||
        (payload && "error" in payload && payload.error) ||
        `Judge0 returned HTTP ${response.status}.`,
      status: response.status,
    };
  }

  return {
    result: mapJudge0Response((payload ?? {}) as Judge0Response),
  };
}

async function drainSubmissionQueue() {
  if (activeExecution || submissionQueue.size === 0) {
    return;
  }

  const job = submissionQueue.pop();

  if (!job) {
    return;
  }

  activeExecution = true;

  try {
    const result = await executeJudge0Submission(job.input);
    job.resolve(result);
  } catch (error) {
    job.reject(error);
  } finally {
    activeExecution = false;
    void drainSubmissionQueue();
  }
}

export async function submitToJudge0(input: Judge0SubmissionInput) {
  return new Promise<Judge0SubmissionOutcome>((resolve, reject) => {
    submissionQueue.push({
      input,
      priority: computeSubmissionPriority(input),
      sequence: sequenceCounter,
      resolve,
      reject,
    });
    sequenceCounter += 1;
    void drainSubmissionQueue();
  });
}
