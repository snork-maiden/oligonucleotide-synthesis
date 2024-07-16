<script setup lang="ts">
import { useSynthesizerStore } from "@/stores/synthesizer";
import type { Priority, TaskStatus } from "@/types/types";
import { secondsLeftToString } from "@/utils/helpers";
import { computed } from "vue";
const store = useSynthesizerStore();

const props = defineProps({
  timestamp: {
    type: Number,
    required: true,
  },
});

const sequenceData = computed(() =>
  store.getSequenceByTimestamp(props.timestamp)
);
const endTime = computed(() => {
  if (sequenceData.value?.status === "progress") {
    return secondsLeftToString(store.getSynthesizer().secondsLeft!);
  }
  if (sequenceData.value?.status === "waiting") {
    const seconds = store.getSecondsToFinish(props.timestamp);
    return secondsLeftToString(seconds);
  }

  return "Готово";
});

const translatedStatus = computed(() =>
  translateStatus(sequenceData.value!.status)
);
const translatedPriority = computed(() =>
  translatePriority(sequenceData.value!.priority)
);

function translateStatus(status: TaskStatus) {
  if (status === "complete") return "Готово";
  if (status === "progress") return "Выполняется";
  if (status === "waiting") return "В очереди";
}

function translatePriority(priority: Priority) {
  if (priority === "high") return "Высокий";
  if (priority === "low") return "Низкий";
  if (priority === "medium") return "Обычный";
}
</script>

<template>
  <tr class="row" v-if="sequenceData">
    <td class="data sequence">{{ sequenceData.sequence }}</td>
    <td class="data">{{ translatedStatus }}</td>
    <td class="data">{{ translatedPriority }}</td>
    <td class="data">{{ sequenceData.timestamp }}</td>
    <td class="data">{{ endTime }}</td>
  </tr>
</template>

<style scoped>
.data {
  text-align: center;
}

.sequence {
  text-align: left;
  max-width: min(400px, 30vw);
  word-wrap: break-word;
}
</style>
