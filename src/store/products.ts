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
    async loadProducts(categoryId: number | null) {
      if (this.getProducts().length > 0 && !categoryId) {
        return
      }

      try {
        this.loading = true

        const api = baseApi()
        const request: Response<Product> = await api.REQUEST({
          path: 'products',
          query: {
            responseFields: 'items(id,name,defaultDisplayedPriceFormatted,hdThumbnailUrl)',
            categoryIds: categoryId
          }
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
          path: `products/${id}`,
          query: {
            responseFields: ['id', 'name', 'imageUrl', 'description', 'defaultDisplayedPriceFormatted']
          }
        })

        this.product = request
      } finally {
        this.loading = false
      }
    }
  }
});
