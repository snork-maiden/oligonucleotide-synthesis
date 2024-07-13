<script setup lang="ts">
import TheSequenceInput from "./TheSequenceInput.vue";
import TheSynthesizer from "./TheSynthesizer.vue";
import TheTaskQueue from "./TheTaskQueue.vue";

import { useSynthesizerStore } from "@/stores/synthesizer";

const store = useSynthesizerStore();
</script>

<template>
  <TheSequenceInput />
  <TheTaskQueue v-if="store.isWaitingSequences" />
  <TheSynthesizer />
</template>

<style scoped></style>
