<script setup lang="ts">
import { RouterView } from "vue-router";
import TheHeader from "./components/TheHeader.vue";
</script>

<template>
  <TheHeader />
  <main class="main">
    <RouterView />
  </main>
</template>

<style scoped>
.main {
  --height: calc(100vh - var(--header-height));
  min-height: var(--height);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2em;
  gap: 2em;
}

@media screen and (min-width: 1000px) {
  .main {
    max-height: var(--height);
  }
}
</style>
