<script setup lang="ts">
import { useSynthesizerStore } from "@/stores/synthesizer";
import type { Filter } from "@/types/types";
import { FilterFieldTranslations } from "@/utils/translations";
import { nextTick } from "vue";
import { computed, watch} from "vue";

const store = useSynthesizerStore();

const filter = defineModel({ default: "" });

const options = computed(() => {
  let options = { ...FilterFieldTranslations };

  const filters = store.getFilters();
  if (!filters) return options;
  Object.keys(filters).forEach((filter) => delete options[filter as Filter]);
  return options;
});

watch(filter, async (newFilter) => {
  if (newFilter === "") return;
  store.setFilter(newFilter as Filter);
  await nextTick();
  filter.value = "";
});
</script>

<template>
  <select class="select" v-model="filter">
    <option value="" class="option" disabled selected>Фильтровать по:</option>
    <option v-for="(value, key) of options" :value="key" class="option">
      {{ value }}
    </option>
  </select>
</template>

<style scoped></style>
