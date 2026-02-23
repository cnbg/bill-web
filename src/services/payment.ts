import { deleteFetchService, getFetchService, postFetchService } from './base'
import type { DtItem, ListQuery, Payment } from '@/types'

const url = import.meta.env.VITE_API_URL! + '/v1'
const page = 'payment'

const PaymentService = {
  getItems: async (query: ListQuery): Promise<DtItem<Payment>> => {
    try {
      return await getFetchService<DtItem<Payment>>(`${url}/${page}/list`, query)
    } catch (error) {
      throw error
    }
  },

  getItem: async (id: string): Promise<Payment> => {
    try {
      return await getFetchService<Payment>(`${url}/${page}/show/${id}`)
    } catch (error) {
      throw error
    }
  },

  deleteItem: async (id: string): Promise<Payment> => {
    try {
      return await deleteFetchService<Payment>(`${url}/${page}/delete/${id}`)
    } catch (error) {
      throw error
    }
  },
}

export default PaymentService
