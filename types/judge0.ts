export type Judge0SubmissionResult = {
  token?: string;
  stdout: string | null;
  stderr: string | null;
  compileOutput: string | null;
  message: string | null;
  status: {
    id: number;
    description: string;
  };
  time: string | null;
  memory: number | null;
};
