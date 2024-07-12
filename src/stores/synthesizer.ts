import { ref, computed, type Ref } from "vue";
import { defineStore } from "pinia";
import type { Sequence, Synthesizer } from "@/types/inderface";

export const useSynthesizerStore = defineStore("synthesizer", () => {
  const synthesizer: Ref<Synthesizer> = ref({
    sequence: null,
    status: "бездействует",
  });
  const sequences: Ref<Sequence[]> = ref([]);

function getSynthesizerStatus() {
  return synthesizer.value.status
}

  return { getSynthesizerStatus };
});
