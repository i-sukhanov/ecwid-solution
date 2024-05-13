<template>
  <div>
    <h1 class="text-2xl font-bold mb-4">Cart</h1>
    <template v-if="cartTotalItems() === 0">
      <p class="text-gray-600">Your cart is empty.</p>
    </template>
    <template v-else>
      <ProductList :products="cart" @remove="removeFromCart" canBeRemoved />
    </template>
  </div>
</template>

<script setup lang="ts">
import ProductList from '@/components/product/ProductList.vue'
import { cartStore } from '@/store/cart'

const { cart, removeFromCart, cartTotalItems } = cartStore()
</script>
