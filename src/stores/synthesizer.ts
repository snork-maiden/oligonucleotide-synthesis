import { ref, computed, type Ref } from "vue";
import { defineStore } from "pinia";
import type { Sequence, Synthesizer } from "@/types/interfaces";
import { createTimer } from "@/utils/timer";

export const useSynthesizerStore = defineStore("synthesizer", () => {
  const synthesizer: Ref<Synthesizer> = ref({
    sequence: null,
    status: "бездействует",
    currentLetterIndex: null,
    secondsLeft: null,
  });
  const sequences: Ref<Sequence[]> = ref([]);
  let synthesizerWorkStake = 0;

  let waitingSequences = computed(() =>
    sequences.value.filter((item) => item.status === "waiting")
  );

  let isWaitingSequences = computed(() => !!waitingSequences.value.length);

  function getSynthesizer() {
    return synthesizer.value;
  }

  function addSequence(sequence: string, timestamp: number) {
    sequences.value.push({
      sequence,
      status: "waiting",
      timestamp,
    });
    if (synthesizer.value.status === "бездействует") {
      activateSynthesizer();
    }
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
    const sequence = waitingSequences.value[0];
    if (!sequence) return;
    sequence.status = "progress";

    synthesizer.value = {
      sequence: sequence.sequence,
      currentLetterIndex: 0,
      status: "занят",
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

    if (synthesizerWorkStake === 4) {
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
        status: "бездействует",
        secondsLeft: null,
      };
      return;
    }

    takeNextSequence();
  }

  function startService() {
    synthesizerWorkStake = 0;

    const SERVICE_TIME = 3;
    synthesizer.value = {
      sequence: null,
      currentLetterIndex: null,
      status: "на обслуживании",
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

  function activateSynthesizer() {
    synthesizer.value.status = "занят";
    takeNextSequence();
  }

  function getSequenceByTimestamp(timestamp: number): Sequence | null {
    return sequences.value.find((item) => item.timestamp === timestamp) ?? null;
  }

  // type TaskStatus = "waiting" | "progress" | "complete";
  return {
    getSynthesizer,
    addSequence,
    editSequence,
    deleteSequence,
    waitingSequences,
    isWaitingSequences,
    getSequenceByTimestamp,
  };
});
