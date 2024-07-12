import type { Nucleotide, Status } from "./types";

export interface Sequence {
  sequence: string;
  status: TaskStatus;
  index: number;
}

type TaskStatus = "waiting" | "progress" | "complete";

export interface Synthesizer {
  sequence: Letter[] | null;
  status: Status;
}

interface Letter {
  letter: Nucleotide;
  status: TaskStatus;
  index: number;
}
