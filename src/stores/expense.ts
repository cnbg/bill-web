import { defineStore } from 'pinia'
import type { ListQuery, Expense } from '@/types'
import { ExpenseService } from '@/services'
import type { DtItem } from '@/types'

interface ExpenseState {
  items: DtItem<Expense>
  item: Expense
  loading: boolean
  creating: boolean
  updating: boolean
  deleting: boolean
  errors: string[]
}

const useExpenseStore = defineStore(`expense-store`, {
  state: (): ExpenseState => ({
    items: {} as DtItem<Expense>,
    item: {} as Expense,
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
        this.items = await ExpenseService.getItems(query)
      } catch (error) {
        this.errors.push(error instanceof Error ? error.message : 'error_fetching_data')
      }

      this.loading = false
    },
    async getItem(id: string) {
      this.loading = true
      this.errors = []

      try {
        this.item = await ExpenseService.getItem(id)
      } catch (error) {
        this.errors.push(error instanceof Error ? error.message : 'error_fetching_data')
      }

      this.loading = false
    },
    async createItem(data: Partial<Expense>) {
      this.creating = true
      this.errors = []

      try {
        this.item = await ExpenseService.createItem(data)
      } catch (error) {
        this.errors.push(error instanceof Error ? error.message : 'error_saving_data')
      }

      this.creating = false
    },
    async updateItem(id: string, data: Partial<Expense>) {
      this.updating = true
      this.errors = []

      try {
        this.item = await ExpenseService.updateItem(id, data)
      } catch (error) {
        this.errors.push(error instanceof Error ? error.message : 'error_saving_data')
      }

      this.updating = false
    },
    async deleteItem(id: string) {
      this.deleting = true
      this.errors = []

      try {
        await ExpenseService.deleteItem(id)
      } catch (error) {
        this.errors.push(error instanceof Error ? error.message : 'error_deleting_data')
      }

      this.deleting = false
    },
  },
})

export default useExpenseStore
