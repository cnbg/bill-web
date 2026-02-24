import { defineStore } from 'pinia'
import { PermService } from '@/services'

interface PermState {
  items: string[]
  loading: boolean
  errors: string[]
}

const usePermStore = defineStore(`perm-store`, {
  state: (): PermState => ({
    items: [] as string[],
    loading: false,
    errors: [],
  }),
  getters: {
    groupedItems: (state) => {
      const grouped: Record<string, string[]> = {}
      for (const perm of state.items) {
        const [group, action] = perm.split('.')
        if (group && action) {
          if (!grouped[group]) {
            grouped[group] = []
          }
          grouped[group].push(action)
        }
      }
      return grouped
    },
  },
  actions: {
    async getItems() {
      this.loading = true
      this.errors = []

      try {
        this.items = await PermService.getItems()
      } catch (error) {
        this.errors.push(error instanceof Error ? error.message : 'error_fetching_data')
      }

      this.loading = false
    },
  },
})

export default usePermStore
