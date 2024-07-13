import { ref, computed, type Ref } from "vue";
import { defineStore } from "pinia";
import type { Sequence, Synthesizer } from "@/types/interfaces";

export const useSynthesizerStore = defineStore("synthesizer", () => {
  const synthesizer: Ref<Synthesizer> = ref({
    sequence: null,
    status: "бездействует",
    currentLetterIndex: null,
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

    synthesizer.value.sequence = sequence.sequence;
    synthesizer.value.currentLetterIndex = 0;
    synthesizer.value.status = "занят";
    //add sequence array to synthesizer, start the timer
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
