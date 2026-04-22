import { defineStore } from 'pinia'
import type { ListQuery, ClientType } from '@/types'
import { ClientTypeService } from '@/services'
import type { DtItem } from '@/types'

interface ClientTypeState {
  items: DtItem<ClientType>
  item: ClientType
  loading: boolean
  creating: boolean
  updating: boolean
  deleting: boolean
  errors: string[]
}

const useClientTypeStore = defineStore(`client-type-store`, {
  state: (): ClientTypeState => ({
    items: {} as DtItem<ClientType>,
    item: {} as ClientType,
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
        this.items = await ClientTypeService.getItems(query)
      } catch (error) {
        this.errors.push(error instanceof Error ? error.message : 'error_fetching_data')
      }

      this.loading = false
    },
    async getItem(id: string) {
      this.loading = true
      this.errors = []

      try {
        this.item = await ClientTypeService.getItem(id)
      } catch (error) {
        this.errors.push(error instanceof Error ? error.message : 'error_fetching_data')
      }

      this.loading = false
    },
    async createItem(data: Partial<ClientType>) {
      this.creating = true
      this.errors = []

      try {
        this.item = await ClientTypeService.createItem(data)
      } catch (error) {
        this.errors.push(error instanceof Error ? error.message : 'error_saving_data')
      }

      this.creating = false
    },
    async updateItem(id: string, data: Partial<ClientType>) {
      this.updating = true
      this.errors = []

      try {
        this.item = await ClientTypeService.updateItem(id, data)
      } catch (error) {
        this.errors.push(error instanceof Error ? error.message : 'error_saving_data')
      }

      this.updating = false
    },
    async deleteItem(id: string) {
      this.deleting = true
      this.errors = []

      try {
        await ClientTypeService.deleteItem(id)
      } catch (error) {
        this.errors.push(error instanceof Error ? error.message : 'error_deleting_data')
      }

      this.deleting = false
    },
  },
})

export default useClientTypeStore
