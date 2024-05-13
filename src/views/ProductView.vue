<template>
  <div class="border border-gray-200 rounded overflow-hidden flex">
    <div class="w-1/3">
      <img :src="product?.imageUrl" :alt="product?.name" class="w-full h-full object-cover" />
    </div>
    <div class="w-2/3 p-4 flex flex-col justify-between">
      <div>
        <h2 class="text-lg font-semibold">{{ product?.name }}</h2>
        <p class="text-gray-600">{{ product?.defaultDisplayedPriceFormatted }}</p>
        <p class="text-gray-700 mt-2" v-html="product?.description" />
      </div>
      <button
        @click="addToCart(product!)"
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
import { useProducts } from '@/composables/useProducts'
import { cartStore } from '@/store/cart'

const { loadProduct, product } = useProducts()
const { params } = useRoute()
const { addToCart, isAlreadyInCart } = cartStore()

const isProductAlreadyInCart = computed(() => isAlreadyInCart(product.value?.id!))
const buttonLabel = computed(() => (isProductAlreadyInCart.value ? 'In cart' : 'Buy'))

loadProduct(params.id as string)
</script>
