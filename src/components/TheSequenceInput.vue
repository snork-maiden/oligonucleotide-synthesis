<script setup lang="ts">
import { useSynthesizerStore } from "@/stores/synthesizer";
import { ref, watch, type ModelRef, type Ref } from "vue";
import NucleotideInput from "./NucleotideInput.vue";
const store = useSynthesizerStore();

let sequence: Ref<string> = ref("");

watch(sequence, (string) => {
  sequence.value = string.replace(/[^atgc]/gi, "");
});

function add() {
  store.addSequence(sequence.value, Date.now());
  sequence.value = "";
}
</script>

<template>
  <div class="warning">Только символы a, t, g, c</div>
  <form @submit.prevent="add">
    <label class="sequence">
      <span class="label">Введите последовательность</span>
      <NucleotideInput v-model="sequence" />
    </label>
    <button type="submit" class="add">Добавить</button>
  </form>
</template>

<style scoped></style>
