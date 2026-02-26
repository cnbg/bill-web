import { defineStore } from 'pinia'
import type { ListQuery, User } from '@/types'
import { UserService } from '@/services'
import type { DtItem } from '@/types'

interface UserState {
  items: DtItem<User>
  item: User
  loading: boolean
  creating: boolean
  updating: boolean
  deleting: boolean
  errors: string[]
}

const useUserStore = defineStore(`user-store`, {
  state: (): UserState => ({
    items: {} as DtItem<User>,
    item: {} as User,
    loading: false,
    creating: false,
    updating: false,
    deleting: false,
    errors: [],
  }),
  getters: {
    name: (state) => `${state.item.firstName} ${state.item.lastName}`,
  },
  actions: {
    async getItems(query: ListQuery) {
      this.loading = true
      this.errors = []

      try {
        this.items = await UserService.getItems(query)
      } catch (error) {
        this.errors.push(error instanceof Error ? error.message : 'error_fetching_data')
      }

      this.loading = false
    },
    async getItem(id: string) {
      this.loading = true
      this.errors = []

      try {
        this.item = await UserService.getItem(id)
      } catch (error) {
        this.errors.push(error instanceof Error ? error.message : 'error_fetching_data')
      }

      this.loading = false
    },
    async deleteItem(id: string) {
      this.deleting = true
      this.errors = []

      try {
        await UserService.deleteItem(id)
      } catch (error) {
        this.errors.push(error instanceof Error ? error.message : 'error_deleting_data')
      }

      this.deleting = false
    },
  },
})

export default useUserStore
