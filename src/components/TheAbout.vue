<script setup lang="ts">
import TheTasksTable from "./TheTasksTable.vue";
import { useSynthesizerStore } from "@/stores/synthesizer";

const store = useSynthesizerStore();
</script>

<template>
  <TheTasksTable />
</template>

<style scoped>

</style>
