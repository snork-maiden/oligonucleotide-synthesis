<script setup lang="ts">
import { useSynthesizerStore } from "@/stores/synthesizer";
import type { Filter } from "@/types/types";
import { FilterFieldTranslations } from "@/utils/translations";
import { computed, ref, watch, type ModelRef } from "vue";

const store = useSynthesizerStore();

const props = defineProps<{
  filter: Filter;
}>();
let value: ModelRef<string | undefined, string> = defineModel();

watch(value, (newValue) => {
  if (newValue) {
    store.setFilter(props.filter, newValue);
  }
});
</script>

<template>
  <label class="input">
    <span class="label">{{ FilterFieldTranslations[filter] + ":" }}</span>
    <input type="text" v-model="value" />
  </label>
  <button type="button" @click="store.deleteFilter(filter)" class="delete">
    <!--Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools-->
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      fill="none"
      viewBox="0 0 24 24"
    >
      <title>Удалить</title>
      <path fill="#fff" d="M0 0h24v24H0z" />
      <path
        stroke="#000"
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M7 17 17 7M7 7l10 10"
      />
    </svg>
  </button>
</template>

<style scoped>
.input {
  display: inline-flex;
  flex-direction: column;
  align-items: center;
}

.delete {
background: none;
border: 0;
}
</style>
