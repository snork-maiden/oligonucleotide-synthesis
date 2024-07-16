<script setup lang="ts">
import { RouterLink } from "vue-router";
</script>

<template>
  <header class="header">
    <nav class="nav">
      <ul class="nav-list">
        <li class="nav-tem">
          <RouterLink class="link" to="/"
            >Синтезатор олигонулекотидов</RouterLink
          >
        </li>
        <li class="nav-tem">
          <RouterLink class="link" to="/tasks">Список задач</RouterLink>
        </li>
      </ul>
    </nav>
  </header>
</template>

<style scoped>
.header {
  display: grid;
  font-size: clamp(0.85em, 2vw, 1em);
  min-height: var(--header-height);
}

.nav {
  padding-top: 1em;
  max-width: min(95vw, 1200px);
}

.nav-list {
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  gap: 1em;
}

.link {
  display: block;
  color: inherit;
  text-decoration: none;
  border-bottom: 1px solid;
}

.link:active,
.link:hover {
  transform: scale(1.02);
}
</style>
