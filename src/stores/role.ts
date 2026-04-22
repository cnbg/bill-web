import { defineStore } from 'pinia'
import type { DtItem, ListQuery, Role } from '@/types'
import { RoleService } from '@/services'

interface RoleState {
  items: DtItem<Role>
  item: Role
  loading: boolean
  creating: boolean
  updating: boolean
  deleting: boolean
  errors: string[]
}

const useRoleStore = defineStore(`role-store`, {
  state: (): RoleState => ({
    items: {} as DtItem<Role>,
    item: {} as Role,
    loading: false,
    creating: false,
    updating: false,
    deleting: false,
    errors: [],
  }),
  getters: {
    hasPerm: (state) => (perm: string) => state.item.perms.includes(perm),
  },
  actions: {
    async getItems(query: ListQuery) {
      this.loading = true
      this.errors = []

      try {
        this.items = await RoleService.getItems(query)
      } catch (error) {
        console.log(error)
        this.errors.push(error instanceof Error ? error.message : 'error_fetching_data')
      }

      this.loading = false
    },
    async getItem(id: string) {
      this.loading = true
      this.errors = []

      try {
        this.item = await RoleService.getItem(id)
      } catch (error) {
        this.errors.push(error instanceof Error ? error.message : 'error_fetching_data')
      }

      this.loading = false
    },
    async togglePerm(id: string, perm: string, add: boolean) {
      this.updating = true
      this.errors = []

      try {
        await RoleService.togglePerm(id, perm, add)
        if (add) {
          if (!this.item.perms.includes(perm)) {
            this.item.perms.push(perm)
          }
        } else {
          this.item.perms = this.item.perms.filter((p) => p !== perm)
        }
      } catch (error) {
        console.log(error)
        this.errors.push(error instanceof Error ? error.message : 'error_updating_data')
      }

      this.updating = false
    },
    async createItem(data: Partial<Role>) {
      this.creating = true
      this.errors = []

      try {
        this.item = await RoleService.createItem(data)
      } catch (error) {
        this.errors.push(error instanceof Error ? error.message : 'error_saving_data')
      }

      this.creating = false
    },
    async updateItem(id: string, data: Partial<Role>) {
      this.updating = true
      this.errors = []

      try {
        this.item = await RoleService.updateItem(id, data)
      } catch (error) {
        this.errors.push(error instanceof Error ? error.message : 'error_saving_data')
      }

      this.updating = false
    },
    async deleteItem(id: string) {
      this.deleting = true
      this.errors = []

      try {
        await RoleService.deleteItem(id)
      } catch (error) {
        this.errors.push(error instanceof Error ? error.message : 'error_deleting_data')
      }

      this.deleting = false
    },
  },
})

export default useRoleStore
