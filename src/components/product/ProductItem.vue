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
    <p class="text-gray-600">{{ product.price }}</p>
    <button
      v-if="canBeRemoved"
      @click.stop="emit('remove', product.id)"
      class="mt-2 bg-red-500 text-white px-4 py-2 rounded"
    >
      Remove
    </button>
  </component>
</template>

<script setup lang="ts">
import type { Product } from '@/types/Product'

const emit = defineEmits<{
  (e: 'remove', value: Product['id']): void
}>()

const props = defineProps<{
  product: Product
  canBeRemoved?: boolean
}>()

const component = props.canBeRemoved ? 'div' : 'RouterLink'
</script>
