import { deleteFetchService, getFetchService, postFetchService } from './base'
import type { DtItem, ListQuery, Rate } from '@/types'

const url = import.meta.env.VITE_API_URL! + '/v1'
const page = 'rate'

const RateService = {
  getItems: async (query: ListQuery): Promise<DtItem<Rate>> => {
    try {
      return await getFetchService<DtItem<Rate>>(`${url}/${page}/list`, query)
    } catch (error) {
      throw error
    }
  },

  getItem: async (id: string): Promise<Rate> => {
    try {
      return await getFetchService<Rate>(`${url}/${page}/show/${id}`)
    } catch (error) {
      throw error
    }
  },

  createItem: async (data: Omit<Rate, 'id'>): Promise<Rate> => {
    try {
      return await postFetchService<Rate>(`${url}/${page}/create`, data)
    } catch (error) {
      throw error
    }
  },

  updateItem: async (id: string, data: Omit<Rate, 'id'>, ): Promise<Rate> => {
    try {
      return await postFetchService<Rate>(`${url}/${page}/update/${id}`, data)
    } catch (error) {
      throw error
    }
  },

  deleteItem: async (id: string): Promise<Rate> => {
    try {
      return await deleteFetchService<Rate>(`${url}/${page}/delete/${id}`)
    } catch (error) {
      throw error
    }
  },
}

export default RateService
