<script setup lang="ts">
import TheMain from "../components/TheMain.vue";
</script>

<template>
  <main class="main">
    <TheMain />
  </main>
</template>

<style scoped>
.main {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2em;
  gap: 2em;
}

@media screen and (min-width: 1000px) {
  .main {
    max-height: 100vh;
  }
}
</style>
