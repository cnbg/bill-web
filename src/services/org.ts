import { deleteFetchService, getFetchService } from './base'
import type { DtItem, ListQuery, Org } from '@/types'

const url = import.meta.env.VITE_API_URL! + '/v1'
const page = 'org'

const OrgService = {
  getItems: async (query: ListQuery): Promise<DtItem<Org>> => {
    try {
      return await getFetchService<DtItem<Org>>(`${url}/${page}/list`, query)
    } catch (error) {
      throw error
    }
  },

  getItem: async (id: string): Promise<Org> => {
    try {
      return await getFetchService<Org>(`${url}/${page}/show/${id}`)
    } catch (error) {
      throw error
    }
  },

  deleteItem: async (id: string): Promise<Org> => {
    try {
      return await deleteFetchService<Org>(`${url}/${page}/delete/${id}`)
    } catch (error) {
      throw error
    }
  },
}

export default OrgService
