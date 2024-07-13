import type { Nucleotide, Status } from "./types";

export interface Sequence {
  sequence: string;
  status: TaskStatus;
  timestamp: number;
}

type TaskStatus = "waiting" | "progress" | "complete";

export interface Synthesizer {
  sequence: string | null;
  status: Status;
  currentLetterIndex: number | null;
  secondsLeft: number | null;
}

// interface Letter {
//   letter: Nucleotide;
//   status: TaskStatus;
//   id: number;
// }
