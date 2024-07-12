import { ref, computed, type Ref } from "vue";
import { defineStore } from "pinia";
import type { Sequence, Synthesizer } from "@/types/interfaces";

export const useSynthesizerStore = defineStore("synthesizer", () => {
  const synthesizer: Ref<Synthesizer> = ref({
    sequence: null,
    status: "бездействует",
  });
  const sequences: Ref<Sequence[]> = ref([]);
  let currentSequenceId = 0;
  let synthesizerWorkStake = 0;

  let waitingSequences = computed(() =>
    sequences.value.filter((item) => item.status === "waiting")
  );
  let synthesizerStatus = computed(() => synthesizer.value.status);

  function addSequence(sequence: string) {
    sequences.value.push({
      sequence,
      status: "waiting",
      id: currentSequenceId++,
    });
    if (synthesizer.value.status === "бездействует") {
      activateSynthesizer();
    }
  }

  function editSequence(id: number, newSequence: string): void {
    const sequence = findSequenceById(id);
    if (!sequence) return;
    sequence.sequence = newSequence;
  }

  function deleteSequence(id: number) {
    const index = sequences.value.findIndex((item) => item.id === id);
    if (index !== -1) {
      sequences.value.splice(index, 1); 
    }
  }

  function takeNextSequence() {
    const sequence = findSequenceById(waitingSequences.value[0].id);
    if (!sequence) return;
    sequence.status = "progress";
    //add sequence array to synthesizer, start the timer
  }

  function activateSynthesizer() {
    synthesizer.value.status = "занят";
    takeNextSequence();
  }

  function findSequenceById(id: number): Sequence | null {
    return sequences.value.find((item) => item.id === id) ?? null;
  }

  // type TaskStatus = "waiting" | "progress" | "complete";
  return { synthesizerStatus, addSequence, editSequence, deleteSequence };
});
