<template>
  <div
    v-if="isLoading()"
    class="border border-gray-200 rounded overflow-hidden flex justify-center items-center"
  >
    <div
      class="loader ease-linear rounded-full border-8 border-t-8 border-gray-400 h-12 w-12"
    ></div>
  </div>
  <div v-else class="border border-gray-200 rounded overflow-hidden flex">
    <div class="w-1/3">
      <img
        :src="getProduct()?.imageUrl"
        :alt="getProduct()?.name"
        class="w-full h-full object-cover"
      />
    </div>
    <div class="w-2/3 p-4 flex flex-col justify-between">
      <div>
        <h2 class="text-lg font-semibold">{{ getProduct()?.name }}</h2>
        <p class="text-gray-600">{{ getProduct()?.defaultDisplayedPriceFormatted }}</p>
        <p class="text-gray-700 mt-2" v-html="getProduct()?.description" />
      </div>
      <button
        @click="addToCart(getProduct()!)"
        :disabled="isProductAlreadyInCart"
        class="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
        :class="{ 'opacity-50 cursor-not-allowed': isProductAlreadyInCart }"
      >
        {{ buttonLabel }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { cartStore } from '@/store/cart'
import { productsStore } from '@/store/products'

const { loadProduct, getProduct, isLoading: isLoading } = productsStore()
const { params } = useRoute()
const { addToCart, isAlreadyInCart } = cartStore()

const isProductAlreadyInCart = computed(() => isAlreadyInCart(getProduct()?.id!))
const buttonLabel = computed(() => (isProductAlreadyInCart.value ? 'In cart' : 'Buy'))

loadProduct(params.id as string)
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
