import { ref } from 'vue'
import { baseApi } from '@/store/api'
import type { Product, ProductList } from '@/types/Product'
import type { Response } from '@/types/Response'

export const useProducts = () => {
  const api = baseApi()

  const loading = ref(false)
  const products = ref<ProductList>([])
  const product = ref<Product | null>(null)

  const loadProducts = async () => {
    try {
      loading.value = true

      const request: Response<Product> = await api.REQUEST({
        path: 'products'
      })

      products.value = request.items
    } finally {
      loading.value = false
    }
  }

  const loadProduct = async (id: string) => {
    try {
      loading.value = true

      const request: Product = await api.REQUEST({
        path: `products/${id}`
      })

      product.value = request
    } finally {
      loading.value = false
    }
  }

  return {
    products,
    product,
    loadProducts,
    loadProduct,
    loading
  }
}
