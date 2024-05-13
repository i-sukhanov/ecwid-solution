<template>
  <div class="border border-gray-200 rounded overflow-hidden">
    <img :src="category.thumbnailUrl" :alt="category.name" class="w-full h-48 object-contain" />
    <div class="p-4">
      <h2 class="text-lg font-semibold">{{ category.name }}</h2>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Category } from '@/types/Category'

defineProps<{
  category: Category
}>()
</script>
