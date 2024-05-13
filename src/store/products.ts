import { defineStore } from 'pinia';
import type { Product, ProductList } from '@/types/Product'
import { baseApi } from '@/store/api'
import type { Response } from '@/types/Response'

export const productsStore = defineStore('products', {
  state: () => {
    return {
      products: [] as ProductList,
      product: null as Product | null,
      loading: false,
    };
  },
  getters: {
    getProducts: (state) => () => state.products,
    getProduct: (state) => () => state.product,
    isLoading: (state) => () => state.loading,
  },
  actions: {
    async loadProducts() {
      if (this.getProducts().length > 0) {
        return
      }

      try {
        this.loading = true

        const api = baseApi()
        const request: Response<Product> = await api.REQUEST({
          path: 'products'
        })

        this.products = request.items
      } finally {
        this.loading = false
      }
    },
    async loadProduct(id: string) {
      try {
        this.loading = true

        const api = baseApi()
        const request: Product = await api.REQUEST({
          path: `products/${id}`
        })

        this.product = request
      } finally {
        this.loading = false
      }
    }
  }
});
