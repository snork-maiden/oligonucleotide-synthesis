<script setup lang="ts">
import { useSynthesizerStore } from "@/stores/synthesizer";
import type { Filter } from "@/types/types";
import { computed } from "vue";
import TasksFiltersSelect from "./TasksFiltersSelect.vue";
import TasksFiltersInput from "./TasksFiltersInput.vue";

const store = useSynthesizerStore();

const filters = computed(() => store.getFilters());
</script>

<template>
  <div class="wrapper">
    <div v-if="filters" class="filters">
      <TasksFiltersInput
        v-for="[key] of Object.entries(filters)"
        :filter="key as Filter"
      />
    </div>
    <TasksFiltersSelect class="select"/>
  </div>
</template>

<style scoped>
.wrapper {
  display: flex;
  align-items: flex-start;
  gap: 2em;
}

.select {
  margin-left: auto;
}

.filters {
  display: flex;
  flex-wrap: wrap;
  gap: 1em ;
}
</style>
