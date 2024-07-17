<script setup lang="ts">
import { useSynthesizerStore } from "@/stores/synthesizer";
import { priorityTranslations, statusTranslations } from "@/utils/translations";
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
</script>

<template>
  <tr class="row" v-if="sequenceData">
    <td class="data sequence">{{ sequenceData.sequence }}</td>
    <td class="data">{{ statusTranslations[sequenceData.status] }}</td>
    <td class="data">{{ priorityTranslations[sequenceData.priority] }}</td>
    <td class="data">{{ sequenceData.timestamp }}</td>
    <td class="data">{{ sequenceData.endWorkTimeString }}</td>
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

.row {
  background-color: var(--table-bg-color);
}

.row:nth-child(2n + 1) {
  background-color: var(--table-bg-color-2);
}
</style>
