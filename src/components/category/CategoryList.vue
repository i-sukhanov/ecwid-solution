<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
    <CategoryItem
      v-for="category in categories"
      :key="category.id"
      :category="category"
      class="p-4 border border-gray-200 rounded"
    />
  </div>
</template>

<script setup lang="ts">
import CategoryItem from '@/components/category/CategoryItem.vue'
import type { CategoryList } from '@/types/Category'

defineProps<{
  categories: CategoryList
}>()
</script>
