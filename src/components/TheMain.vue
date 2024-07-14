<script setup lang="ts">
import TheSequenceInput from "./TheSequenceInput.vue";
import TheSynthesizer from "./TheSynthesizer.vue";
import TheTaskQueue from "./TheTaskQueue.vue";

import { useSynthesizerStore } from "@/stores/synthesizer";

const store = useSynthesizerStore();
</script>

<template>
  <h1 class="title">Синтезатор олигонуклеотидов</h1>

  <TheSequenceInput />
  <TheTaskQueue v-if="store.isWaitingSequences" />
  <TheSynthesizer class="synthesizer" />
</template>

<style scoped>
.synthesizer {
  margin-top: auto;
}

.title {
  font-size: clamp(1.6em, 5vw, 2.3em);
  text-align: center;
}
</style>
