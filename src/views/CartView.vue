<template>
  <div>
    <h1 class="text-2xl font-bold mb-4">Cart</h1>
    <template v-if="cartTotalItems() === 0">
      <p class="text-gray-600">Your cart is empty.</p>
    </template>
    <template v-else>
      <ProductList :products="getCart()" @remove="removeFromCart" editable />
      <div class="flex justify-between mt-4">
        <button @click="placeOrder" class="bg-green-500 text-white px-4 py-2 rounded">
          Place Order
        </button>
        <button @click="dropCart" class="bg-red-500 text-white px-4 py-2 rounded">
          Clear Cart
        </button>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import ProductList from '@/components/product/ProductList.vue'
import { cartStore } from '@/store/cart'

const { getCart, removeFromCart, cartTotalItems, dropCart } = cartStore()

const placeOrder = () => {
  alert('Order placed!')

  dropCart()
}
</script>
