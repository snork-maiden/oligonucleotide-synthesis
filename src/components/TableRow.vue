<script setup lang="ts">
import { useSynthesizerStore } from "@/stores/synthesizer";
import { secondsLeftToString } from "@/utils/helpers";
import { computed, ref } from "vue";
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
  if (sequenceData.value?.status === "progress")
    return secondsLeftToString(store.getSynthesizer().secondsLeft!);
});
</script>

<template>
  <tr class="row" v-if="sequenceData">
    <td class="data sequence">{{ sequenceData.sequence }}</td>
    <td class="data">{{ sequenceData.status }}</td>
    <td class="data">{{ sequenceData.priority }}</td>
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
  max-width: 400px;
  word-wrap: break-word;
}
</style>
