<script setup lang="ts">
import { useSynthesizerStore } from "@/stores/synthesizer";
import { computed, ref, watch, type ModelRef, type Ref } from "vue";
import NucleotideInput from "./NucleotideInput.vue";

const store = useSynthesizerStore();

const props = defineProps({
  timestamp: {
    type: Number,
    required: true,
  },
});

let isEditing = ref(false);
const sequenceData = ref(store.getSequenceByTimestamp(props.timestamp));
const sequence = computed(() => sequenceData.value?.sequence || "");
let newSequence: Ref<string> = ref("");

watch(isEditing, (value) => {
  if (!value) return;
  newSequence.value = sequence.value;
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
      <button class="button" @click="store.deleteSequence(timestamp)">
        Удалить
      </button>
      <button class="button" @click="isEditing = true">Редактировать</button>
    </template>
    <form v-else @submit.prevent="saveChanges">
      <NucleotideInput v-model="newSequence" />
      <button class="button" @click="isEditing = false">Отменить</button>
      <button class="submit">Сохранить</button>
    </form>
    <!-- + add status select -->
  </li>
</template>

<style scoped></style>
