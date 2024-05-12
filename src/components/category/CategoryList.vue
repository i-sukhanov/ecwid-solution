<template>
  <div>
    <CategoryItem v-for="category in categories" :key="category.id" :category="category" />
  </div>
</template>

<script setup lang="ts">
import CategoryItem from '@/components/category/CategoryItem.vue'
import type { CategoryList } from '@/types/Category'

defineProps<{
  categories: CategoryList
}>()
</script>
