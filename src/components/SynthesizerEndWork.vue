<script setup lang="ts">
import { useSynthesizerStore } from "@/stores/synthesizer";
import { secondsLeftToString } from "@/utils/helpers";
import { computed } from "vue";

const store = useSynthesizerStore();

const timeString = computed(() => {
  const workTime = store.totalWorkTime;
  if (!workTime) return "0:00";
  const minutes = Math.floor(workTime / 60);
  const seconds = workTime % 60;
  return timeComponentToString(minutes) + ":" + timeComponentToString(seconds);

  function timeComponentToString(time: number): string {
    return time < 10 ? "0" + time : "" + time;
  }
});

const endWorkTime = computed(() => secondsLeftToString(store.totalWorkTime!));
</script>

<template>
  <div class="wrapper">
    <div class="title">Конец работы</div>
    <div class="description">через:</div>
    <div class="time">{{ timeString }}</div>
    <div class="description">в:</div>
    <div class="time">{{ endWorkTime }}</div>
  </div>
</template>

<style scoped>
.wrapper {
  display: flex;
  flex-wrap: wrap;
  gap: 0.3em;
}

.description {
  font-weight: 600;
}
</style>
