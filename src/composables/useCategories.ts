import { ref } from 'vue'
import { baseApi } from '@/store/api'
import type { Category, CategoryList } from '@/types/Category'
import type { Response } from '@/types/Response'

export const useCategories = () => {
  const api = baseApi()
  const loading = ref(false)

  const categories = ref<CategoryList>([])

  const loadCategories = async () => {
    try {
      loading.value = true

      const request: Response<Category> = await api.REQUEST({
        path: 'categories'
      })

      categories.value = request.items
    } finally {
      loading.value = false
    }
  }

  return {
    categories,
    loadCategories,
  }
}
