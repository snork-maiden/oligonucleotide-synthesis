<script setup lang="ts">
import { useSynthesizerStore } from "@/stores/synthesizer";
import type { Filter } from "@/types/types";
// import { FilterFieldTranslations } from "@/utils/translations";
import { computed, ref, watch, type ModelRef } from "vue";
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
}

.select {
  margin-left: auto;
}
</style>
