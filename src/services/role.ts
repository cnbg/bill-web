import { getFetchService, putFetchService, deleteFetchService, postFetchService } from './base'
import type { DtItem, ListQuery, Role } from '@/types'

const url = import.meta.env.VITE_API_URL! + '/v1'
const page = 'role'

const RoleService = {
  getItems: async (query: ListQuery): Promise<DtItem<Role>> => {
    try {
      return await getFetchService<DtItem<Role>>(`${url}/${page}/list`, query)
    } catch (error) {
      throw error
    }
  },

  getItem: async (id: string): Promise<Role> => {
    try {
      return await getFetchService<Role>(`${url}/${page}/show/${id}`)
    } catch (error) {
      throw error
    }
  },

  togglePerm: async (id: string, perm: string, add: boolean): Promise<void> => {
    try {
      await putFetchService(`${url}/${page}/perm/${id}`, { perm, add })
    } catch (error) {
      throw error
    }
  },

  createItem: async (data: Partial<Role>): Promise<Role> => {
    try {
      return await postFetchService<Role>(`${url}/${page}/create`, data)
    } catch (error) {
      throw error
    }
  },

  updateItem: async (id: string, data: Partial<Role>): Promise<Role> => {
    try {
      return await putFetchService<Role>(`${url}/${page}/update/${id}`, data)
    } catch (error) {
      throw error
    }
  },

  deleteItem: async (id: string): Promise<Role> => {
    try {
      return await deleteFetchService<Role>(`${url}/${page}/delete/${id}`)
    } catch (error) {
      throw error
    }
  },
}

export default RoleService
