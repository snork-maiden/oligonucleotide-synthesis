<script setup lang="ts">
import { ref } from "vue";

let status = ref("бездействует");
</script>

<template>
  <div class="synthesizer">
    <div class="status">{{ status }}</div>
    <div class="progress">
      atgc
    </div>
  </div>
</template>

<script scoped></script>
