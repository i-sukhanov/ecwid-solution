<template>
  <div>
    <h1>Cart</h1>
    <ProductList :products="cart" @remove="removeFromCart" canBeRemoved />
  </div>
</template>

<script lang="ts" setup>
import { useCart } from '@/composables/useCart'
import ProductList from '@/components/product/ProductList.vue'

const { cart, removeFromCart } = useCart()
</script>
