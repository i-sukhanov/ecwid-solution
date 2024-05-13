import { defineStore } from 'pinia';
import type { Category, CategoryList } from '@/types/Category'
import { baseApi } from '@/store/api'
import type { Response } from '@/types/Response'

export const categoriesStore = defineStore('categories', {
  state: () => {
    return {
      categories: [] as CategoryList,
      loading: false,
      activeCategory: null as Category['id'] | null
    };
  },
  getters: {
    getCategories: (state) => () => state.categories,
    isLoading: (state) => () => state.loading,
    isCategoryActive: (state) => (categoryId: Category['id']) => state.activeCategory === categoryId
  },
  actions: {
    async loadCategories() {
      if (this.getCategories().length > 0) {
        return
      }

      try {
        this.loading = true

        const api = baseApi()
        const request: Response<Category> = await api.REQUEST({
          path: 'categories',
          query: {
            responseFields: 'items(id,name,thumbnailUrl)',
          }
        })

        this.categories = request.items
      } finally {
        this.loading = false
      }
    },
    setActiveCategory(categoryId: Category['id']) {
      this.activeCategory = categoryId || null
    }
  }
});
