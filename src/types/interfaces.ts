import type { Priority, Status } from "./types";

export interface Sequence {
  sequence: string;
  status: TaskStatus;
  timestamp: number;
  priority: Priority;
}

type TaskStatus = "waiting" | "progress" | "complete";

export interface Synthesizer {
  sequence: string | null;
  status: Status;
  currentLetterIndex: number | null;
  secondsLeft: number | null;
}
