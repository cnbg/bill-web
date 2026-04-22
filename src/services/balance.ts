import { deleteFetchService, getFetchService, postFetchService } from './base'
import type { DtItem, ListQuery, Balance } from '@/types'

const url = import.meta.env.VITE_API_URL! + '/v1'
const page = 'balance'

const BalanceService = {
  getItems: async (query: ListQuery): Promise<DtItem<Balance>> => {
    try {
      return await getFetchService<DtItem<Balance>>(`${url}/${page}/list`, query)
    } catch (error) {
      throw error
    }
  },

  getItem: async (id: string): Promise<Balance> => {
    try {
      return await getFetchService<Balance>(`${url}/${page}/show/${id}`)
    } catch (error) {
      throw error
    }
  },

  deleteItem: async (id: string): Promise<Balance> => {
    try {
      return await deleteFetchService<Balance>(`${url}/${page}/delete/${id}`)
    } catch (error) {
      throw error
    }
  },
}

export default BalanceService
