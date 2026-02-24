import { defineStore } from 'pinia'
import type { ListQuery, Client } from '@/types'
import { ClientService } from '@/services'
import type { DtItem } from '@/types'

interface ClientState {
  items: DtItem<Client>
  item: Client
  loading: boolean
  creating: boolean
  updating: boolean
  deleting: boolean
  errors: string[]
}

const useClientStore = defineStore(`client-store`, {
  state: (): ClientState => ({
    items: {} as DtItem<Client>,
    item: {} as Client,
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
        this.items = await ClientService.getItems(query)
      } catch (error) {
        this.errors.push(error instanceof Error ? error.message : 'error_fetching_data')
      }

      this.loading = false
    },
    async getItem(id: string) {
      this.loading = true
      this.errors = []

      try {
        this.item = await ClientService.getItem(id)
      } catch (error) {
        this.errors.push(error instanceof Error ? error.message : 'error_fetching_data')
      }

      this.loading = false
    },
    async deleteItem(id: string) {
      this.deleting = true
      this.errors = []

      try {
        await ClientService.deleteItem(id)
      } catch (error) {
        this.errors.push(error instanceof Error ? error.message : 'error_deleting_data')
      }

      this.deleting = false
    },
  },
})

export default useClientStore
