import { deleteFetchService, getFetchService, postFetchService, putFetchService } from './base'
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

  createItem: async (data: Partial<District>): Promise<District> => {
    try {
      return await postFetchService<District>(`${url}/${page}/create`, data)
    } catch (error) {
      throw error
    }
  },

  updateItem: async (id: string, data: Partial<District>): Promise<District> => {
    try {
      return await putFetchService<District>(`${url}/${page}/update/${id}`, data)
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
