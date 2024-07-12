<script setup lang="ts"></script>

<template>
  <label class="sequence">
    <span class="label">Введите последовательность</span>
    <input type="text" class="sequence" />
  </label>
  <div class="warning">Длина от 6 до 120 символов</div>
  <div class="warning">Только символы a, t, g, c</div>
  <button type="button" class="add">Добавить</button>
</template>

<script scoped>
</script>