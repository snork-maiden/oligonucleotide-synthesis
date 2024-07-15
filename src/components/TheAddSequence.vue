<script setup lang="ts">
import { useSynthesizerStore } from "@/stores/synthesizer";
import { ref, watch, type ModelRef, type Ref } from "vue";
import NucleotideInput from "./NucleotideInput.vue";
import PrioritySelect from "./PrioritySelect.vue";
import type { Priority } from "@/types/types";
const store = useSynthesizerStore();

let sequence: Ref<string> = ref("");
let priority: Ref<Priority> = ref('medium');

function add() {
  store.addSequence(sequence.value, Date.now(), priority.value);
  sequence.value = "";
  priority.value = 'medium'
}
</script>

<template>
  <form @submit.prevent="add" class="form">
    <label class="sequence">
      <span class="label">Введите последовательность:</span>
      <NucleotideInput v-model="sequence" @submit="add" class="input" />
    </label>
    <div class="warning">Только нуклеотиды a, t, g, c</div>
    <PrioritySelect v-model="priority"/>
    <button type="submit" class="add">Добавить</button>
  </form>
</template>

<style scoped>
.form {
  display: grid;
  gap: 0.5em 1em;
}
.sequence {
  display: grid;
  gap: 0.5em;
}

.input {
  width: min(500px, 80vw);
  height: 5.2em;
}
</style>
