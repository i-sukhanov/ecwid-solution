<template>
  <RouterLink
    :to="{ query: { category: category.id } }"
    class="border border-gray-200 rounded overflow-hidden flex items-center"
    :class="{ 'border-blue-500': isCategoryActive(category.id) }"
  >
    <img :src="category.thumbnailUrl" :alt="category.name" class="w-1/2 h-20 object-contain" />
    <div class="p-4 w-1/2">
      <h2 class="text-lg font-semibold">{{ category.name }}</h2>
    </div>
  </RouterLink>
</template>

<script setup lang="ts">
import type { Category } from '@/types/Category'
import { categoriesStore } from '@/store/categories'

const emit = defineEmits<{
  (e: 'setCategory', value: Category): void
}>()

defineProps<{
  category: Category
}>()

const { isCategoryActive } = categoriesStore()
</script>
