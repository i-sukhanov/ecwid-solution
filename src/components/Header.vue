<script lang="ts" setup>
import { RouterLink } from 'vue-router'
import { cartStore } from '@/store/cart'

const { cartTotalItems } = cartStore()
</script>

<template>
  <header class="bg-gray-800 text-white">
    <div class="wrapper py-4 flex justify-between items-center p-4">
      <nav>
        <RouterLink to="/products">Products</RouterLink>
      </nav>
      <RouterLink to="/cart" class="text-xl relative">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="white"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <circle cx="9" cy="21" r="1" />
          <circle cx="20" cy="21" r="1" />
          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.74a2 2 0 0 0 2-1.61L23 6H6" />
        </svg>

        <span
          v-if="cartTotalItems() > 0"
          class="absolute bottom-3 left-5 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs"
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
