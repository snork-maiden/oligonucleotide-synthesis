<script setup lang="ts">
import { useSynthesizerStore } from "@/stores/synthesizer";
import { computed, ref, watch, type Ref } from "vue";
import NucleotideInput from "./NucleotideInput.vue";
import PrioritySelect from "./PrioritySelect.vue";
import type { Priority } from "@/types/types";

const store = useSynthesizerStore();

const props = defineProps({
  timestamp: {
    type: Number,
    required: true,
  },
});

let isEditing: Ref<boolean> = ref(false);

const sequenceData = computed(() =>
  store.getSequenceByTimestamp(props.timestamp)
);
const sequence = computed(() => sequenceData.value?.sequence || '');

let newSequence: Ref<string> = ref("");
let priority: Ref<Priority> = ref(sequenceData.value!.priority);

watch(isEditing, (value) => {
  if (!value) return;
  newSequence.value = sequence.value;
});
watch(priority, (value) => {
  store.changeSequencePriority(props.timestamp, value);
});

function saveChanges() {
  isEditing.value = false;
  if (sequence.value === newSequence.value) return;
  store.editSequence(props.timestamp, newSequence.value);
}
</script>

<template>
  <li class="item" v-if="sequence">
    <template v-if="!isEditing">
      <div class="task">{{ sequence }}</div>
      <div class="buttons">
        <button class="button" @click="store.deleteSequence(timestamp)">
          Удалить
        </button>
        <button class="button" @click="isEditing = true">Редактировать</button>
      </div>
    </template>
    <form v-else @submit.prevent="saveChanges">
      <NucleotideInput
        v-model="newSequence"
        class="task"
        @submit="saveChanges"
      />
      <button class="button" @click="isEditing = false">Отменить</button>
      <button class="submit">Сохранить</button>
    </form>
    <PrioritySelect v-model="priority" />
  </li>
</template>

<style scoped>
.item {
  display: grid;
  gap: 0.3em;
}
.task {
  max-width: min(600px, 80vw);
  word-wrap: break-word;
}
</style>
