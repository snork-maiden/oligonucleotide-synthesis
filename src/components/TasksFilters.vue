<script setup lang="ts">
import { useSynthesizerStore } from "@/stores/synthesizer";
import { computed } from "vue";

const store = useSynthesizerStore();
</script>

<template>
<select class="select">
<option value="status" class="option">Статус</option>
<option value="priority" class="option">Приоритет</option>
<option value="timestamp" class="option">Timestamp</option>
<option value="endWorkTimeString" class="option">Время завершения</option>

</select>
</template>

<style scoped>

</style>
