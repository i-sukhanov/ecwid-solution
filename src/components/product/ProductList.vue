<template>
  <div>
    <ProductItem
      v-for="product in products"
      :key="product.id"
      :product="product"
      :canBeRemoved="canBeRemoved"
      @remove="emit('remove', product.id)"
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
