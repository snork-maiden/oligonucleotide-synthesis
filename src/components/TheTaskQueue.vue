<script setup lang="ts">
import SynthesisTask from "./SynthesisTask.vue";
import { useSynthesizerStore } from "@/stores/synthesizer";

const store = useSynthesizerStore();
</script>

<template>
  <ul class="queue">
    <SynthesisTask
      v-for="task of store.waitingSequences.reverse()"
      :key="task.timestamp"
      :timestamp="task.timestamp"
      class="sequence"
    />
  </ul>
</template>

<style scoped>
.queue {
  overflow-y: auto;
  display: grid;
  padding: 0.5em;
  gap: 0.5em;
}
.sequence {
  max-width: 1200px;
}
</style>
