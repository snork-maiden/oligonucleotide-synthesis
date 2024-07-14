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
  height: 100vh;
  max-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2em;
  gap: 2em;
}
</style>
