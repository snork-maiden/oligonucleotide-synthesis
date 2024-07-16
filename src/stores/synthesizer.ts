import { ref, computed, type Ref } from "vue";
import { defineStore } from "pinia";
import type { Sequence, Synthesizer } from "@/types/interfaces";
import { createTimer } from "@/utils/timer";
import type { Priority } from "@/types/types";

export const useSynthesizerStore = defineStore("synthesizer", () => {
  const synthesizer: Ref<Synthesizer> = ref({
    sequence: null,
    status: "idle",
    currentLetterIndex: null,
    secondsLeft: null,
  });
  const sequences: Ref<Sequence[]> = ref([]);
  let synthesizerWorkStake = 0;
  const MAX_STAKE = 5;
  const SERVICE_TIME = 3;

  const waitingSequences = computed(() =>
    sequences.value.filter((item) => item.status === "waiting")
  );

  const sortedWaitingSequences = computed(() => {
    const highPriority = waitingSequences.value.filter(
      (item) => item.priority === "high"
    );
    const mediumPriority = waitingSequences.value.filter(
      (item) => item.priority === "medium"
    );
    const lowPriority = waitingSequences.value.filter(
      (item) => item.priority === "low"
    );

    return [...highPriority, ...mediumPriority, ...lowPriority];
  });

  const isWaitingSequences = computed(
    (): boolean => !!waitingSequences.value.length
  );

  const totalServiceTime = computed((): number =>
    calculateServiceTime(waitingSequences.value.length)
  );

  const secondsToProcessWaiting = computed((): number =>
    waitingSequences.value.reduce((sum, item) => sum + item.sequence.length, 0)
  );

  const totalWorkTime = computed((): number | null => {
    if (synthesizer.value.secondsLeft === null) return null;
    return (
      secondsToProcessWaiting.value +
      synthesizer.value.secondsLeft +
      totalServiceTime.value
    );
  });

  function getSynthesizer() {
    return synthesizer.value;
  }

  function getSequences() {
    return sequences.value;
  }

  function getSecondsToFinish(timestamp: number): number {
    const index = sortedWaitingSequences.value.findIndex(
      (item) => item.timestamp === timestamp
    );
    if (index === -1) throw new Error("No such sequence in queue");
    const sequences = sortedWaitingSequences.value.slice(0, index + 1);
    const timeToProcess = sequences.reduce(
      (sum, item) => sum + item.sequence.length,
      0
    );
    return (
      calculateServiceTime(sequences.length) +
      timeToProcess +
      synthesizer.value.secondsLeft!
    );
  }

  function addSequence(
    sequence: string,
    timestamp: number,
    priority: Priority = "medium"
  ) {
    sequences.value.push({
      sequence,
      status: "waiting",
      timestamp,
      priority,
    });
    if (synthesizer.value.status === "idle") {
      takeNextSequence();
    }
  }

  function changeSequencePriority(
    timestamp: number,
    newPriority: Priority
  ): void {
    const sequence = getSequenceByTimestamp(timestamp);
    if (!sequence) return;
    sequence.priority = newPriority;
  }

  function editSequence(timestamp: number, newSequence: string): void {
    const sequence = getSequenceByTimestamp(timestamp);
    if (!sequence) return;
    sequence.sequence = newSequence;
  }

  function deleteSequence(timestamp: number) {
    const index = sequences.value.findIndex(
      (item) => item.timestamp === timestamp
    );
    if (index !== -1) {
      sequences.value.splice(index, 1);
    }
  }

  function takeNextSequence() {
    const sequence = sortedWaitingSequences.value[0];
    if (!sequence) return;
    sequence.status = "progress";

    synthesizer.value = {
      sequence: sequence.sequence,
      currentLetterIndex: 0,
      status: "busy",
      secondsLeft: sequence.sequence.length,
    };
    processSequence();
  }

  function processSequence() {
    const seconds = synthesizer.value.secondsLeft;
    if (seconds === null) {
      throw new Error("Seconds not provided");
    }

    createTimer(
      seconds,
      (secondsLeft) => {
        synthesizer.value.secondsLeft = secondsLeft;
        synthesizer.value.currentLetterIndex =
          synthesizer.value.sequence!.length - secondsLeft;
      },
      () => {
        stopTimer();
      }
    );
  }

  function stopTimer() {
    sequences.value = sequences.value.map((item) => {
      if (item.status === "progress") {
        return { ...item, status: "complete" };
      }
      return item;
    });
    synthesizerWorkStake++;
    console.log(synthesizerWorkStake);
    if (synthesizerWorkStake === MAX_STAKE) {
      startService();
      return;
    }

    workWithQueue();
  }

  function workWithQueue() {
    if (!isWaitingSequences.value) {
      synthesizer.value = {
        sequence: null,
        currentLetterIndex: null,
        status: "idle",
        secondsLeft: null,
      };
      return;
    }

    takeNextSequence();
  }

  function startService() {
    synthesizerWorkStake = 0;

    synthesizer.value = {
      sequence: null,
      currentLetterIndex: null,
      status: "service",
      secondsLeft: SERVICE_TIME,
    };
    createTimer(
      SERVICE_TIME,
      (secondsLeft) => {
        synthesizer.value.secondsLeft = secondsLeft;
      },
      () => {
        workWithQueue();
      }
    );
  }

  function getSequenceByTimestamp(timestamp: number): Sequence | null {
    return sequences.value.find((item) => item.timestamp === timestamp) ?? null;
  }

  function calculateServiceTime(sequencesLength: number): number {
    const finalStack = synthesizerWorkStake + sequencesLength;
    if (finalStack <= MAX_STAKE) return 0;

    return Math.round(finalStack / MAX_STAKE) * SERVICE_TIME;
  }

  return {
    getSynthesizer,
    getSequenceByTimestamp,
    getSequences,
    getSecondsToFinish,
    addSequence,
    editSequence,
    deleteSequence,
    changeSequencePriority,
    waitingSequences,
    isWaitingSequences,
    totalWorkTime,
  };
});
