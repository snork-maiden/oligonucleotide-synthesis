<script setup lang="ts">
import { useSynthesizerStore } from "@/stores/synthesizer";
import TableRow from "./TableRow.vue";

const store = useSynthesizerStore();
</script>

<template>
  <div class="wrapper">
    {{ new Date().toLocaleTimeString() }}
    <table class="table">
      <thead>
        <tr class="row">
          <th class="header"></th>
          <th class="header">Статус</th>
          <th class="header">Приоритет</th>
          <th class="header">Создание задачи (timestamp)</th>
          <th class="header">Время завершения</th>
        </tr>
      </thead>
      <tbody>
        <template v-if="store.filteredSequences.length">
          <TableRow
            v-for="item of store.filteredSequences"
            :key="item.timestamp"
            :timestamp="item.timestamp"
          />
        </template>
      </tbody>
    </table>

    <div class="warning" v-if="!store.filteredSequences.length">
      Ничего не найдено
    </div>
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

.warning {
  padding: 2em;
}
</style>
