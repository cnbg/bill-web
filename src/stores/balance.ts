import { defineStore } from 'pinia'
import type { ListQuery, Balance } from '@/types'
import { BalanceService } from '@/services'
import type { DtItem } from '@/types'

interface BalanceState {
  items: DtItem<Balance>
  item: Balance
  loading: boolean
  creating: boolean
  updating: boolean
  deleting: boolean
  errors: string[]
}

const useBalanceStore = defineStore(`balance-store`, {
  state: (): BalanceState => ({
    items: {} as DtItem<Balance>,
    item: {} as Balance,
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
        this.items = await BalanceService.getItems(query)
      } catch (error) {
        this.errors.push(error instanceof Error ? error.message : 'error_fetching_data')
      }

      this.loading = false
    },
    async getItem(id: string) {
      this.loading = true
      this.errors = []

      try {
        this.item = await BalanceService.getItem(id)
      } catch (error) {
        this.errors.push(error instanceof Error ? error.message : 'error_fetching_data')
      }

      this.loading = false
    },
    async deleteItem(id: string) {
      this.deleting = true
      this.errors = []

      try {
        await BalanceService.deleteItem(id)
      } catch (error) {
        this.errors.push(error instanceof Error ? error.message : 'error_deleting_data')
      }

      this.deleting = false
    },
  },
})

export default useBalanceStore
