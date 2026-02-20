import { defineStore } from 'pinia'
import type { Org } from '@/types'
import { OrgService } from '@/services'
import type { DtItem } from '@/types'

interface OrgState {
  items: DtItem<Org>
  item: Org
  loading: boolean
  creating: boolean
  updating: boolean
  deleting: boolean
  errors: string[]
}

const useOrgStore = defineStore(`org-store`, {
  state: (): OrgState => ({
    items: {} as DtItem<Org>,
    item: {} as Org,
    loading: false,
    creating: false,
    updating: false,
    deleting: false,
    errors: [],
  }),
  getters: {},
  actions: {
    async getItems() {
      this.loading = true
      this.errors = []

      try {
        this.items = await OrgService.getItems()
      } catch (error) {
        this.errors.push(error instanceof Error ? error.message : 'error_fetching_data')
      }

      this.loading = false
    },
    async getItem(id: string) {
      this.loading = true
      this.errors = []

      try {
        this.item = await OrgService.getItem(id)
      } catch (error) {
        this.errors.push(error instanceof Error ? error.message : 'error_fetching_data')
      }

      this.loading = false
    },
    async deleteItems(ids: string[]) {
      this.deleting = true
      this.errors = []

      try {
        await OrgService.deleteItems(ids)
      } catch (error) {
        this.errors.push(error instanceof Error ? error.message : 'error_deleting_data')
      }

      this.deleting = false
    },
  },
})

export default useOrgStore
