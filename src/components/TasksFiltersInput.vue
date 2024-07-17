<script setup lang="ts">
import { useSynthesizerStore } from "@/stores/synthesizer";
import type { Filter } from "@/types/types";
import { FilterFieldTranslations } from "@/utils/translations";
import { ref, watch, type ModelRef } from "vue";

const store = useSynthesizerStore();

const props = defineProps<{
  filter: Filter;
}>();
let value: ModelRef<string | undefined, string> = defineModel();

watch(value, (newValue) => {
  if (newValue) {
    store.setFilter(props.filter, newValue);
    return
  }
  store.setFilter(props.filter);
});
</script>

<template>
  <div class="filter-input">
    <label :for="`filter-${filter}`" class="label"
      >{{ FilterFieldTranslations[filter] }}:</label
    >
    <input :id="`filter-${filter}`" type="text" v-model="value" class="input" />
    <button type="button" @click="store.deleteFilter(filter)" class="delete">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="close-icon"
      >
        <line x1="18" y1="6" x2="6" y2="18"></line>
        <line x1="6" y1="6" x2="18" y2="18"></line>
      </svg>
    </button>
  </div>
</template>

<style scoped>
.filter-input {
  display: flex;
  align-items: center;
}

.input {
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 8em;
}

.label {
  margin-right: 0.5em;
}

.delete {
  display: grid;
  place-items: center;
  background: none;
  border: 0;
  margin-left: -0.2em;
}
</style>
