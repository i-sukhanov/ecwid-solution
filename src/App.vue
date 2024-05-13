<script setup lang="ts">
import { RouterView } from 'vue-router'
import HeaderC from './components/Header.vue'
</script>

<template>
  <div>
    <HeaderC />
    <div class="wrapper p-4">
      <RouterView />
    </div>
  </div>
</template>

<style scoped>
.wrapper {
  max-width: 1200px;
  margin: 0 auto;
}
</style>
