import { deleteFetchService, getFetchService } from './base'
import type { DtItem, ListQuery, User } from '@/types'

const url = import.meta.env.VITE_API_URL! + '/v1'
const page = 'user'

const UserService = {
  getItems: async (query: ListQuery): Promise<DtItem<User>> => {
    try {
      return await getFetchService<DtItem<User>>(`${url}/${page}/list`, query)
    } catch (error) {
      throw error
    }
  },

  getItem: async (id: string): Promise<User> => {
    try {
      return await getFetchService<User>(`${url}/${page}/show/${id}`)
    } catch (error) {
      throw error
    }
  },

  deleteItem: async (id: string): Promise<User> => {
    try {
      return await deleteFetchService<User>(`${url}/${page}/delete/${id}`)
    } catch (error) {
      throw error
    }
  },
}

export default UserService
