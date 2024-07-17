import { ref, computed, type Ref, watch } from "vue";
import { defineStore } from "pinia";
import type { Sequence, Synthesizer } from "@/types/interfaces";
import { createTimer } from "@/utils/timer";
import type { Filter, FilterObject, Priority } from "@/types/types";
import { secondsLeftToString } from "@/utils/helpers";

export const useSynthesizerStore = defineStore("synthesizer", () => {
  const synthesizer: Ref<Synthesizer> = ref({
    sequence: null,
    status: "idle",
    currentLetterIndex: null,
    secondsLeft: null,
  });
  const sequences: Ref<Sequence[]> = ref([]);
  const filters: Ref<FilterObject> = ref({});
  let synthesizerWorkStake = 0;
  const MAX_STAKE = 5;
  const SERVICE_TIME = 3;

  const waitingSequences = computed(() =>
    sequences.value.filter((item) => item.status === "waiting")
  );

  const sortedWaitingSequences = computed((): Sequence[] => {
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

  const filteredSequences = computed((): Sequence[] => {
    const filtersParams = Object.entries(filters.value).filter(
      ([, value]) => value !== null
    );

    let filteredSequences = sequences.value;
    if (!filtersParams.length) return filteredSequences;

    filtersParams.forEach(([key, value]) => {
      filteredSequences = filteredSequences.filter((item) => {
        const parameterString = item[key as Filter]?.toString();
        return parameterString?.startsWith(value!);
      });
    });
    return filteredSequences;
  });

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
    return sequences.value
  }

  function getFilters() {
    if (!Object.keys(filters.value).length) return null;
    return filters.value;
  }

  function addSequence(
    sequence: string,
    timestamp: number,
    priority: Priority = "medium"
  ): void {
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

  function deleteSequence(timestamp: number): void {
    const index = sequences.value.findIndex(
      (item) => item.timestamp === timestamp
    );
    if (index !== -1) {
      sequences.value.splice(index, 1);
    }
  }

  function setFilter(filterName: Filter, value: string | null = null) {
    filters.value[filterName] = value;
  }

  function deleteFilter(filterName: Filter) {
    delete filters.value[filterName];
  }

  function takeNextSequence(): void {
    const sequence = sortedWaitingSequences.value[0];
    if (!sequence) return;
    const seconds = sequence.sequence.length;
    sequence.status = "progress";
    sequence.endWorkTimeString = secondsLeftToString(seconds);
    synthesizer.value = {
      sequence: sequence.sequence,
      currentLetterIndex: 0,
      status: "busy",
      secondsLeft: seconds,
    };
    processSequence();
  }

  function processSequence(): void {
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

  function stopTimer(): void {
    sequences.value = sequences.value.map((item) => {
      if (item.status === "progress") {
        return { ...item, status: "complete" };
      }
      return item;
    });
    synthesizerWorkStake++;

    if (synthesizerWorkStake === MAX_STAKE) {
      startService();
      return;
    }

    workWithQueue();
  }

  function workWithQueue(): void {
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

  function startService(): void {
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

  watch(sortedWaitingSequences, (sequences) => {
    sequences.forEach(
      (item) =>
        (item.endWorkTimeString = calculateEndWorkTimeString(item.timestamp))
    );
  });

  function calculateEndWorkTimeString(timestamp: number): string {
    const index = sortedWaitingSequences.value.findIndex(
      (item) => item.timestamp === timestamp
    );
    if (index === -1) throw new Error("No such sequence in queue");
    const sequences = sortedWaitingSequences.value.slice(0, index + 1);
    const timeToProcess = sequences.reduce(
      (sum, item) => sum + item.sequence.length,
      0
    );
    const seconds =
      calculateServiceTime(sequences.length) +
      timeToProcess +
      synthesizer.value.secondsLeft!;
    return secondsLeftToString(seconds);
  }

  return {
    getSynthesizer,
    getSequenceByTimestamp,
    getFilters,
    getSequences,
    addSequence,
    editSequence,
    deleteSequence,
    changeSequencePriority,
    waitingSequences,
    isWaitingSequences,
    totalWorkTime,
    filteredSequences,
    setFilter,
    deleteFilter,
  };
});
