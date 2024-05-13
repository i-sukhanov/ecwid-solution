<template>
  <div class="my-8 relative">
    <div
      v-if="loading"
      class="absolute inset-0 flex justify-center items-center bg-gray-200 bg-opacity-50"
    >
      <div
        class="loader ease-linear rounded-full border-8 border-t-8 border-gray-400 h-12 w-12"
      ></div>
    </div>

    <CategoryList v-if="!categoriesLoading()" :categories="getCategories()" class="mb-8" />
    <ProductList v-if="!productsLoading()" :products="getProducts()" />
  </div>
</template>

<script lang="ts" setup>
import ProductList from '@/components/product/ProductList.vue'
import CategoryList from '@/components/category/CategoryList.vue'
import { productsStore } from '@/store/products'
import { categoriesStore } from '@/store/categories'
import { useRoute } from 'vue-router'
import { computed, watch } from 'vue'

const route = useRoute()

const { getProducts, loadProducts, isLoading: productsLoading } = productsStore()
const {
  getCategories,
  loadCategories,
  isLoading: categoriesLoading,
  setActiveCategory,
} = categoriesStore()

const loading = computed(() => categoriesLoading() || productsLoading())

watch(
  () => route.query.category,
  (value) => {
    const categoryId = Number(value) ?? null
    setActiveCategory(categoryId)
    loadProducts(categoryId)
  },
  {
    immediate: true,
  },
)

loadCategories()
</script>

<style scoped>
.loader {
  border: 8px solid #f3f3f3;
  border-top: 8px solid #3498db;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: spin 2s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
