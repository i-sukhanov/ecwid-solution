<template>
  <component :is="component" :to="`products/${product.id}`">
    <h2>{{ product.name }}</h2>
    <p>{{ product.price }}</p>
    <button v-if="canBeRemoved" @click.stop="emit('remove', product.id)">Remove</button>
  </component>
</template>

<script setup lang="ts">
import type { Product } from '@/types/Product'
import { RouterLink } from 'vue-router'

const emit = defineEmits<{
  (e: 'remove', value: Product['id']): void
}>()

const props = defineProps<{
  product: Product
  canBeRemoved?: boolean
}>()

const component = props.canBeRemoved ? 'div' : 'RouterLink'
</script>
