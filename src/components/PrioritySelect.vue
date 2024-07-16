<script setup lang="ts">
import type { Priority } from "@/types/types";
import { type ModelRef } from "vue";

let value = defineModel({ default: "medium" }) as ModelRef<Priority>;
</script>

<template>
  <label class="select">
    <span class="label">Приоритет:</span>

    <select v-model="value" required>
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
