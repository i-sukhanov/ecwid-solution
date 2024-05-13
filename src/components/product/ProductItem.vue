<template>
  <component
    :is="component"
    :to="`products/${product.id}`"
    class="block border border-gray-200 rounded p-4 cursor-pointer"
  >
    <div class="flex justify-center mb-4">
      <img :src="product.hdThumbnailUrl" alt="Product Image" class="w-32 h-32 object-cover" />
    </div>
    <h2 class="text-lg font-semibold">{{ product.name }}</h2>
    <p class="text-gray-600">{{ product.defaultDisplayedPriceFormatted }}</p>
    <button
      v-if="editable"
      @click.stop="emit('remove', product.id)"
      class="mt-2 bg-red-500 text-white px-4 py-2 rounded"
    >
      Remove
    </button>
    <button
      v-if="!editable"
      @click.prevent="addToCart(product)"
      :disabled="isProductAlreadyInCart"
      class="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
      :class="{ 'opacity-50 cursor-not-allowed': isProductAlreadyInCart }"
    >
      {{ buttonLabel }}
    </button>
  </component>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { Product } from '@/types/Product'
import { cartStore } from '@/store/cart'

const emit = defineEmits<{
  (e: 'remove', value: Product['id']): void
}>()

const props = defineProps<{
  product: Product
  editable?: boolean
}>()

const component = props.editable ? 'div' : 'RouterLink'

const { addToCart, isAlreadyInCart } = cartStore()

const isProductAlreadyInCart = computed(() => isAlreadyInCart(props.product.id!))
const buttonLabel = computed(() => (isProductAlreadyInCart.value ? 'In cart' : 'Buy'))
</script>
