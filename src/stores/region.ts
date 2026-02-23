import { defineStore } from 'pinia'
import type { ListQuery, Region } from '@/types'
import { RegionService } from '@/services'
import type { DtItem } from '@/types'

interface RegionState {
  items: DtItem<Region>
  item: Region
  loading: boolean
  creating: boolean
  updating: boolean
  deleting: boolean
  errors: string[]
}

const useRegionStore = defineStore(`region-store`, {
  state: (): RegionState => ({
    items: {} as DtItem<Region>,
    item: {} as Region,
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
        this.items = await RegionService.getItems(query)
      } catch (error) {
        this.errors.push(error instanceof Error ? error.message : 'error_fetching_data')
      }

      this.loading = false
    },
    async getItem(id: string) {
      this.loading = true
      this.errors = []

      try {
        this.item = await RegionService.getItem(id)
      } catch (error) {
        this.errors.push(error instanceof Error ? error.message : 'error_fetching_data')
      }

      this.loading = false
    },
    async deleteItem(id: string) {
      this.deleting = true
      this.errors = []

      try {
        await RegionService.deleteItem(id)
      } catch (error) {
        this.errors.push(error instanceof Error ? error.message : 'error_deleting_data')
      }

      this.deleting = false
    },
  },
})

export default useRegionStore
