import { deleteFetchService, getFetchService } from './base'
import type { DtItem, ListQuery, District } from '@/types'

const url = import.meta.env.VITE_API_URL! + '/v1'
const page = 'district'

const DistrictService = {
  getItems: async (query: ListQuery): Promise<DtItem<District>> => {
    try {
      return await getFetchService<DtItem<District>>(`${url}/${page}/list`, query)
    } catch (error) {
      throw error
    }
  },

  getItem: async (id: string): Promise<District> => {
    try {
      return await getFetchService<District>(`${url}/${page}/show/${id}`)
    } catch (error) {
      throw error
    }
  },

  deleteItem: async (id: string): Promise<District> => {
    try {
      return await deleteFetchService<District>(`${url}/${page}/delete/${id}`)
    } catch (error) {
      throw error
    }
  },
}

export default DistrictService
