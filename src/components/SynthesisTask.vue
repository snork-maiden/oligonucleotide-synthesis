<script setup lang="ts">
import { useSynthesizerStore } from "@/stores/synthesizer";
import { computed, ref, type Ref } from "vue";

const store = useSynthesizerStore();

const props = defineProps({
  timestamp: {
    type: Number,
    required: true,
  },
});

let isEditing = ref(false);
const sequenceData = ref(store.getSequenceByTimestamp(props.timestamp));
const sequence = computed(() => sequenceData.value?.sequence);
let newSequence: Ref<string> = ref('');

function saveChanges() {
  isEditing.value = false;
  if (sequence.value === newSequence.value) return;
  store.editSequence(props.timestamp, newSequence.value);
}
</script>

<template>
  <li class="item" v-if="sequence">
    <div class="task">{{ newSequence || sequence }}</div>
    <button class="button" @click="store.deleteSequence(timestamp)">Удалить</button>
    <button class="button" v-if="!isEditing" @click="isEditing = true">
      Редактировать
    </button>
    <template v-else>
      <input type="text" name="" id="">
      <button class="button" @click="isEditing = false">Отменить</button>
      <button class="button" @click="saveChanges">Сохранить</button>
    </template>
    <!-- + add status select -->
  </li>
</template>

<style scoped></style>
