<template>
  <CategoryList :categories="categories" />
  <ProductList :products="products" />
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
