<script setup lang="ts">
import { ref, watch, type ModelRef, type Ref } from "vue";

// const props = defineProps({
//   sequence: {
//     type: String,
//     required: false,
//     default: ''
//   }
// })
let sequence: ModelRef<string> = defineModel({ default: '' });

watch(sequence, (string) => {
  sequence.value = string.replace(/[^atgc]/gi, "");
});
</script>

<template>
  <input
    type="text"
    class="sequence"
    v-model="sequence"
    minlength="6"
    maxlength="120"
  />
</template>

<style scoped></style>
