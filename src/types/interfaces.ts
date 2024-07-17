import type { Priority, Status, TaskStatus,  } from "./types";

export interface Sequence {
  sequence: string;
  status: TaskStatus;
  timestamp: number;
  priority: Priority;
  endWorkTimeString?: string;
}

export interface Synthesizer {
  sequence: string | null;
  status: Status;
  currentLetterIndex: number | null;
  secondsLeft: number | null;
}
