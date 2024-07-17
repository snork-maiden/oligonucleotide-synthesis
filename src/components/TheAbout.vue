<script setup lang="ts">
import { useSynthesizerStore } from "@/stores/synthesizer";
import TheTasksTable from "./TheTasksTable.vue";
import { computed } from "vue";
import TasksFilters from "./TasksFilters.vue";
const store = useSynthesizerStore();
const isSequences = computed(() => store.getSequences().length);
</script>

<template>
  <div class="wrapper">
    <template v-if="isSequences">
      <TasksFilters/>
      <TheTasksTable />
    </template>
    <div class="warning" v-else>
      Перейдите на <RouterLink class="link" to="/">главную</RouterLink>, чтобы
      добавить последовательности
    </div>
  </div>
</template>

<style scoped>
.wrapper {
  margin: auto;
}
.link {
  color: inherit;
  font-weight: 500;
  text-decoration: none;
}
</style>
