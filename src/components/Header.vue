<script lang="ts" setup>
import { RouterLink } from 'vue-router'
import { cartStore } from '@/store/cart'

const { cartTotalItems } = cartStore()
</script>

<template>
  <header class="bg-gray-800 text-white">
    <div class="wrapper py-4 flex justify-between items-center p-4">
      <nav>
        <RouterLink to="/" class="mr-4">Home</RouterLink>
        <RouterLink to="/products">Products</RouterLink>
      </nav>
      <RouterLink to="/cart" class="text-xl relative">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-8 w-8"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="M2 2h5l2.3 9H19M16 21a2 2 0 01-2 2h-4a2 2 0 01-2-2"></path>
          <circle cx="10" cy="20" r="1"></circle>
          <circle cx="17" cy="20" r="1"></circle>
        </svg>
        <span
          v-if="cartTotalItems() > 0"
          class="absolute top-0 right-0 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs"
          >{{ cartTotalItems() }}</span
        >
      </RouterLink>
    </div>
  </header>
</template>

<style scoped>
.wrapper {
  max-width: 1200px;
  margin: 0 auto;
}
</style>
