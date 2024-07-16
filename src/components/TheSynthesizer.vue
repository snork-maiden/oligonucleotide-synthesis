<script setup lang="ts">
import { useSynthesizerStore } from "@/stores/synthesizer";
import { computed } from "vue";
import SynthesizerEndWork from "./SynthesizerEndWork.vue";

const store = useSynthesizerStore();

function getClass(index: number) {
  const currentIndex = store.getSynthesizer().currentLetterIndex;
  if (currentIndex === null) return {};
  return {
    current: index === currentIndex,
    done: index < currentIndex,
  };
}

const statusTranslate = computed(() => {
  const status = store.getSynthesizer().status;
  switch (status) {
    case "idle":
      return "бездействует";
    case "busy":
      return "занят";
    case "service":
      return "на обслуживании";
  }
});
</script>

<template>
  <div class="synthesizer">
    <div class="status">
      <span class="status-title"> Статус: </span>
      {{ statusTranslate }}
    </div>
    <SynthesizerEndWork v-if="store.totalWorkTime" />
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
  padding: 2em;
  background-color: var(--synthesizer-bg-color);
  width: 100%;
  max-width: 1000px;
  display: grid;
}

@media screen and (min-width: 700px) {
  .synthesizer {
    aspect-ratio: 3.5/1;
  }
}

.status {
  text-align: center;
  text-transform: uppercase;
  margin-bottom: 0.5em;
}

.status-title {
  font-weight: 600;
}

.progress {
  display: flex;
  align-items: start;
  flex-wrap: wrap;
  gap: 0.1em;
  color: #808080;
}

.letter {
  padding: 0.1em;
}

.current {
  outline: 2px solid white;
  color: var(--color-text);
}

.done {
  color: green;
}
</style>
