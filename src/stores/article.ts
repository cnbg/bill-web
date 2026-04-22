import { defineStore } from 'pinia'
import type { ListQuery, Article } from '@/types'
import { ArticleService } from '@/services'
import type { DtItem } from '@/types'

interface ArticleState {
  items: DtItem<Article>
  item: Article
  loading: boolean
  creating: boolean
  updating: boolean
  deleting: boolean
  errors: string[]
}

const useArticleStore = defineStore(`article-store`, {
  state: (): ArticleState => ({
    items: {} as DtItem<Article>,
    item: {} as Article,
    loading: false,
    creating: false,
    updating: false,
    deleting: false,
    errors: [],
  }),
  getters: {},
  actions: {
    async getItems(query: ListQuery) {
      this.loading = true
      this.errors = []

      try {
        this.items = await ArticleService.getItems(query)
      } catch (error) {
        this.errors.push(error instanceof Error ? error.message : 'error_fetching_data')
      }

      this.loading = false
    },
    async getItem(id: string) {
      this.loading = true
      this.errors = []

      try {
        this.item = await ArticleService.getItem(id)
      } catch (error) {
        this.errors.push(error instanceof Error ? error.message : 'error_fetching_data')
      }

      this.loading = false
    },
    async createItem(data: Partial<Article>) {
      this.creating = true
      this.errors = []

      try {
        this.item = await ArticleService.createItem(data)
      } catch (error) {
        this.errors.push(error instanceof Error ? error.message : 'error_saving_data')
      }

      this.creating = false
    },
    async updateItem(id: string, data: Partial<Article>) {
      this.updating = true
      this.errors = []

      try {
        this.item = await ArticleService.updateItem(id, data)
      } catch (error) {
        this.errors.push(error instanceof Error ? error.message : 'error_saving_data')
      }

      this.updating = false
    },
    async deleteItem(id: string) {
      this.deleting = true
      this.errors = []

      try {
        await ArticleService.deleteItem(id)
      } catch (error) {
        this.errors.push(error instanceof Error ? error.message : 'error_deleting_data')
      }

      this.deleting = false
    },
  },
})

export default useArticleStore
