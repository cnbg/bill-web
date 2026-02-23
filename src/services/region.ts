import { deleteFetchService, getFetchService } from './base'
import type { DtItem, ListQuery, Region } from '@/types'

const url = import.meta.env.VITE_API_URL! + '/v1'
const page = 'region'

const RegionService = {
  getItems: async (query: ListQuery): Promise<DtItem<Region>> => {
    try {
      return await getFetchService<DtItem<Region>>(`${url}/${page}/list`, query)
    } catch (error) {
      throw error
    }
  },

  getItem: async (id: string): Promise<Region> => {
    try {
      return await getFetchService<Region>(`${url}/${page}/show/${id}`)
    } catch (error) {
      throw error
    }
  },

  deleteItem: async (id: string): Promise<Region> => {
    try {
      return await deleteFetchService<Region>(`${url}/${page}/delete/${id}`)
    } catch (error) {
      throw error
    }
  },
}

export default RegionService
