<template>
  <div>
    <h2>{{ product?.name }}</h2>
    <p>{{ product?.price }}</p>
    <button @click="addToCart(product!)" :disabled="isProductAlreadyInCart">
      {{ buttonLabel }}
    </button>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useProducts } from '@/composables/useProducts'
import { useCart } from '@/composables/useCart'

const { loadProduct, product } = useProducts()
const { params } = useRoute()
const { addToCart, isAlreadyInCart } = useCart()

const isProductAlreadyInCart = computed(() => isAlreadyInCart(product.value?.id!))
const buttonLabel = computed(() => (isProductAlreadyInCart.value ? 'In cart' : 'Buy'))

loadProduct(params.id as string)
</script>
