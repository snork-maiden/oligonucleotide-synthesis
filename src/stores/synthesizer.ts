import { ref, computed, type Ref } from "vue";
import { defineStore } from "pinia";
import type { Sequence, Synthesizer } from "@/types/interfaces";

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
    const sequence = getSequenceByTimestamp(
      waitingSequences.value[0].timestamp
    );
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
    let countStop: any;
    const seconds = synthesizer.value.secondsLeft;
    setTimer();

    function setTimer() {
      if (seconds === null) {
        throw Error;
      }
      clearInterval(countStop);
      const start = Date.now();
      const end = new Date(start + seconds * 1000);

      function setCountdown() {
        const msecondsLeft = new Date(
          Math.round((+end - Date.now()) / 1000) * 1000
        );
        let secondsLeft = +msecondsLeft / 1000;
        if (secondsLeft < 0) {
          stopTimer();
          clearInterval(countStop);
          return;
        }
        synthesizer.value.secondsLeft = secondsLeft;
        synthesizer.value.currentLetterIndex =
          synthesizer.value.sequence!.length - secondsLeft;
        if ((secondsLeft = 0)) {
          stopTimer();
        }
      }
      setCountdown();
      countStop = setInterval(setCountdown, 1000);
    }
  }

  function stopTimer() {
    sequences.value = sequences.value.map((item) => {
      if (item.status === "progress") {
        return { ...item, status: "complete" };
      }
      return item;
    });
    synthesizerWorkStake++;

    if (synthesizerWorkStake === 5) {
      synthesizerWorkStake = 0;
      startService();
      return;
    }

    if (!isWaitingSequences.value) {
      synthesizer.value = {
        sequence: null,
        currentLetterIndex: null,
        status: "бездействует",
        secondsLeft: null,
      };
      return;
    }

    console.log(synthesizerWorkStake, isWaitingSequences.value);
    takeNextSequence();
  }

  function startService() {}

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
