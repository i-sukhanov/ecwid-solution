<template>
  <div class="my-8">
    <CategoryList :categories="categories" class="mb-8" />
    <ProductList :products="products" />
  </div>
</template>

<script lang="ts" setup>
import ProductList from '@/components/product/ProductList.vue'
import CategoryList from '@/components/category/CategoryList.vue'
import { useProducts } from '@/composables/useProducts'
import { useCategories } from '@/composables/useCategories'

const { products, loadProducts } = useProducts()
const { categories, loadCategories } = useCategories()

loadCategories()
loadProducts()
</script>
