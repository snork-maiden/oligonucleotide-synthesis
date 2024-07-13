<script setup lang="ts">
import { useSynthesizerStore } from "@/stores/synthesizer";
import { ref } from "vue";

const store = useSynthesizerStore();
</script>

<template>
  <div class="synthesizer">
    <div class="status">Статус: {{ store.synthesizerStatus }}</div>
    <div class="progress">atgc</div>
  </div>
</template>

<style scoped>
.synthesizer {
  border: 2px solid;
  padding: 2em;
}
</style>
