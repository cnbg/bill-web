import { defineStore } from 'pinia'
import type { ListQuery, OrgType } from '@/types'
import { OrgTypeService } from '@/services'
import type { DtItem } from '@/types'

interface OrgTypeState {
  items: DtItem<OrgType>
  item: OrgType
  loading: boolean
  creating: boolean
  updating: boolean
  deleting: boolean
  errors: string[]
}

const useOrgTypeStore = defineStore(`orgtype-store`, {
  state: (): OrgTypeState => ({
    items: {} as DtItem<OrgType>,
    item: {} as OrgType,
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
        this.items = await OrgTypeService.getItems(query)
      } catch (error) {
        this.errors.push(error instanceof Error ? error.message : 'error_fetching_data')
      }

      this.loading = false
    },
    async getItem(id: string) {
      this.loading = true
      this.errors = []

      try {
        this.item = await OrgTypeService.getItem(id)
      } catch (error) {
        this.errors.push(error instanceof Error ? error.message : 'error_fetching_data')
      }

      this.loading = false
    },
    async createItem(data: Partial<OrgType>) {
      this.creating = true
      this.errors = []

      try {
        this.item = await OrgTypeService.createItem(data)
      } catch (error) {
        this.errors.push(error instanceof Error ? error.message : 'error_saving_data')
      }

      this.creating = false
    },
    async updateItem(id: string, data: Partial<OrgType>) {
      this.updating = true
      this.errors = []

      try {
        this.item = await OrgTypeService.updateItem(id, data)
      } catch (error) {
        this.errors.push(error instanceof Error ? error.message : 'error_saving_data')
      }

      this.updating = false
    },
    async deleteItem(id: string) {
      this.deleting = true
      this.errors = []

      try {
        await OrgTypeService.deleteItem(id)
      } catch (error) {
        this.errors.push(error instanceof Error ? error.message : 'error_deleting_data')
      }

      this.deleting = false
    },
  },
})

export default useOrgTypeStore
