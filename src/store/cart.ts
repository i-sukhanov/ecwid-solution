import { defineStore } from 'pinia';
import type { Product, ProductList } from '@/types/Product'
import { useLocalStorage } from '@/helpers/localStorage'
import { LocalStorageKeys } from '@/enums/LocalStorage'
const { getItem, setItem, removeItem } = useLocalStorage<ProductList>(LocalStorageKeys.CART)


export const cartStore = defineStore('cart', {
  state: (): { cart: ProductList } => {
    return { cart: [] };
  },
  getters: {
    isAlreadyInCart: (state) =>
      (id: number) =>
        state.cart.some((product) => product.id === id),
    cartTotalItems: (state) => () => state.cart.length
  },
  actions: {
    addToCart(product: Product) {
      setItem([...this.cart, product])
      this.cart = getItem() || []
    },
    removeFromCart(id: number) {
      const updatedCart = this.cart.filter((product) => product.id !== id)

      setItem(updatedCart)
      this.cart = updatedCart
    },
    dropCart() {
      removeItem()
      this.cart = []
    }
  }

});
