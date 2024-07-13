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
    />
  </ul>
</template>

<style scoped></style>
