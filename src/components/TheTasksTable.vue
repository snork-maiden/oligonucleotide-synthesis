<script setup lang="ts">
import { useSynthesizerStore } from "@/stores/synthesizer";
import TableRow from "./TableRow.vue";

const store = useSynthesizerStore();
</script>

<template>
  <div class="wrapper" v-if="store.getSequences().length">
    <table class="table">
      <tr class="row">
        <th class="header"></th>
        <th class="header">Статус</th>
        <th class="header">Приоритет</th>
        <th class="header">Создание задачи (timestamp)</th>
        <th class="header">Завершится&nbsp;в:</th>
      </tr>
      <TableRow
        v-for="item of store.getSequences()"
        :key="item.timestamp"
        :timestamp="item.timestamp"
      />
    </table>
  </div>
  <div class="warning" v-else>
    Перейдите на <RouterLink class="link" to="/">главную</RouterLink>, чтобы
    добавить последовательности
  </div>
</template>

<style scoped>

.wrapper {
  max-width: 95vw;
  overflow-x: auto
}

.table {
  margin-top: 2em;
}
.header {
  font-weight: 600;
}

.link {
  color: inherit;
  font-weight: 500;
  text-decoration: none;
}

.header,
.table td {
  text-align: center;
  padding: 0.6em;
}

.table tr {
  background-color: white;
}

.table tr:nth-child(2n + 1) {
  background-color: #eef4f7;
}
</style>
