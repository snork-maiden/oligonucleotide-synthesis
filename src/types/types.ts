export type Status = "idle" | "busy" | "service";
export type Priority = "high" | "medium" | "low";
export type TaskStatus = "waiting" | "progress" | "complete";
export type Filter = "priority" | "status" | "timestamp" | "endWorkTimeString";

export type FilterObject = {
    [key in Filter]?: string | null;
  };