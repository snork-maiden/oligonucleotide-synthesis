<script setup lang="ts">
import { useSynthesizerStore } from "@/stores/synthesizer";
import { ref, watch, type Ref } from "vue";
const store = useSynthesizerStore();

let sequence: Ref<string> = ref("");
let isLengthError = ref(false);

watch(sequence, (string) => {
  sequence.value = string.replace(/[^atgc]/gi, "");
});

function add() {
  if (sequence.value.length < 6 || sequence.value.length > 120) {
    isLengthError.value = true;
    return;
  }
  isLengthError.value = false;
  store.addSequence(sequence.value, Date.now());
  sequence.value = "";
}
</script>

<template>
  <div class="warning">Только символы a, t, g, c</div>
  <form @submit.prevent="add">
    <label class="sequence">
      <span class="label">Введите последовательность</span>
      <input
        type="text"
        class="sequence"
        v-model="sequence"
        minlength="6"
        maxlength="120"
      />
    </label>
    <button type="submit" class="add">Добавить</button>
  </form>
  <div class="warning" v-if="isLengthError">Длина от 6 до 120 символов</div>
</template>

<style scoped></style>
