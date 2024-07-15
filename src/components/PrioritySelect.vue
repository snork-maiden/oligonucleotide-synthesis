<script setup lang="ts">
import type { Priority } from "@/types/types";
import { onMounted, ref, watch, type ModelRef, type Ref } from "vue";

let value = defineModel({ default:'medium' }) as ModelRef<Priority>;

</script>

<template>
 <label class="select">
  <span class="label">Приоритет:</span>

  <select required v-model="value">
    <option value="low">низкий</option>
    <option value="medium">средний</option>
    <option value="high">высокий</option>
  </select>
 </label>
</template>

<style scoped>
.select {
  display: flex;
  gap: 0.5em;
}
</style>
