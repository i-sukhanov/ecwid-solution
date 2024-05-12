<template>
  <div>
    <h2>{{ category.name }}</h2>
    <img :src="category.thumbnailUrl" :alt="category.name" />
  </div>
</template>

<script setup lang="ts">
import type { Category } from '@/types/Category'

defineProps<{
  category: Category
}>()
</script>
