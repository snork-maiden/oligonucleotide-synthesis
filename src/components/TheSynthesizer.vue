<script setup lang="ts">
import { useSynthesizerStore } from "@/stores/synthesizer";
import { computed, ref } from "vue";

const store = useSynthesizerStore();

function getClass(index: number) {
  const currentIndex = store.getSynthesizer().currentLetterIndex;
  if (currentIndex === null) return {};
  return {
    current: index === currentIndex,
    done: index < currentIndex,
  };
}
</script>

<template>
  <div class="synthesizer">
    <div class="status">Статус: {{ store.getSynthesizer().status }}</div>
    <div class="progress" v-if="store.getSynthesizer().sequence">
      <span
        class="letter"
        :class="getClass(index)"
        v-for="(letter, index) of store.getSynthesizer().sequence"
      >
        {{ letter }}
      </span>
    </div>
  </div>
</template>

<style scoped>
.synthesizer {
  border: 2px solid;
  padding: 2em;
}

.progress {
  display: flex;
  flex-wrap: wrap;
  gap: 0.1em;
  color: grey;
}

.letter {
  padding: 0.1em;
}

.current {
  outline: 1px solid blueviolet;
  color: var(--color-text);
}

.done {
  color: green;
}
</style>
