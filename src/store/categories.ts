import { defineStore } from 'pinia';
import type { Category, CategoryList } from '@/types/Category'

import { baseApi } from '@/store/api'
import type { Response } from '@/types/Response'

export const categoriesStore = defineStore('categories', {
  state: () => {
    return {
      categories: [] as CategoryList,
      loading: false
    };
  },
  getters: {
    getCategories: (state) => () => state.categories,
    isLoading: (state) => () => state.loading
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
          path: 'categories'
        })

        this.categories = request.items
      } finally {
        this.loading = false
      }
    }
  }
});
