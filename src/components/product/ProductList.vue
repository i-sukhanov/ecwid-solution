<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
    <ProductItem
      v-for="product in products"
      :key="product.id"
      :product="product"
      :canBeRemoved="canBeRemoved"
      @remove="emit('remove', product.id)"
      class="p-4 border border-gray-200 rounded"
    />
  </div>
</template>

<script setup lang="ts">
import ProductItem from '@/components/product/ProductItem.vue'
import type { ProductList, Product } from '@/types/Product'

const emit = defineEmits<{
  (e: 'remove', value: Product['id']): void
}>()

defineProps<{
  products: ProductList
  canBeRemoved?: boolean
}>()
</script>
