import { deleteFetchService, getFetchService, postFetchService } from './base'
import type { DtItem, ListQuery, Charge } from '@/types'

const url = import.meta.env.VITE_API_URL! + '/v1'
const page = 'charge'

const ChargeService = {
  getItems: async (query: ListQuery): Promise<DtItem<Charge>> => {
    try {
      return await getFetchService<DtItem<Charge>>(`${url}/${page}/list`, query)
    } catch (error) {
      throw error
    }
  },

  getItem: async (id: string): Promise<Charge> => {
    try {
      return await getFetchService<Charge>(`${url}/${page}/show/${id}`)
    } catch (error) {
      throw error
    }
  },

  deleteItem: async (id: string): Promise<Charge> => {
    try {
      return await deleteFetchService<Charge>(`${url}/${page}/delete/${id}`)
    } catch (error) {
      throw error
    }
  },
}

export default ChargeService
