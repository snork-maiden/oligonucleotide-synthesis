<script setup lang="ts">
import { watch, type ModelRef } from "vue";

const emit = defineEmits<{
  (e: "submit"): void;
}>();
let sequence: ModelRef<string> = defineModel({ default: "" });

watch(sequence, (string) => {
  sequence.value = string.replace(/[^atgc]/gi, "");
});
</script>

<template>
  <textarea
    v-model="sequence"
    class="sequence"
    minlength="6"
    maxlength="120"
    @keydown.enter="emit('submit')"
    wrap="hard"
  ></textarea>
</template>

<style scoped>
.sequence {
  width: 100%;
  word-wrap: break-word;
}
</style>
