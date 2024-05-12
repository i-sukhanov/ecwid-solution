import { computed, ref } from 'vue'
import type { Product, ProductList } from '@/types/Product'
import { useLocalStorage } from '@/helpers/localStorage'
import { LocalStorageKeys } from '@/enums/LocalStorage'

const { getItem, setItem, removeItem } = useLocalStorage<ProductList>(LocalStorageKeys.CART)

export const useCart = () => {
  const cart = ref<ProductList>(getItem() ?? [])

  const addToCart = (product: Product) => {
    setItem([...cart.value, product])
    cart.value = getItem() || []
  }

  const removeFromCart = (id: number) => {
    const updatedCart = cart.value.filter((product) => product.id !== id)

    setItem(updatedCart)
    cart.value = updatedCart
  }

  const isAlreadyInCart = (id: number) => cart.value.some((product) => product.id === id)

  const cartTotalItems = computed(() => cart.value.length)

  return {
    cart,
    cartTotalItems,
    addToCart,
    removeFromCart,
    dropCart: removeItem,
    isAlreadyInCart
  }
}
