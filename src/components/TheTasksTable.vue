<script setup lang="ts">
import { useSynthesizerStore } from "@/stores/synthesizer";
import TableRow from "./TableRow.vue";
import { computed } from "vue";

const store = useSynthesizerStore();
</script>

<template>
  <div class="wrapper">
    {{ (new Date).toLocaleTimeString() }}
    <table class="table">
      <thead>
        <tr class="row">
          <th class="header"></th>
          <th class="header">Статус</th>
          <th class="header">Приоритет</th>
          <th class="header">Создание задачи (timestamp)</th>
          <th class="header">Завершится&nbsp;в:</th>
        </tr>
      </thead>
      <tbody>
        <TableRow
          v-for="item of store.getSequences()"
          :key="item.timestamp"
          :timestamp="item.timestamp"
        />
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.wrapper {
  max-width: 95vw;
  overflow-x: auto;
}

.table {
  margin-top: 2em;
}
.header {
  font-weight: 600;
  background-color: var(--table-bg-color);
}

.header,
.table td {
  text-align: center;
  padding: 0.6em;
}
</style>
