import { deleteFetchService, getFetchService } from './base'
import type { DtItem, ListQuery, Client } from '@/types'

const url = import.meta.env.VITE_API_URL! + '/v1'
const page = 'client'

const ClientService = {
  getItems: async (query: ListQuery): Promise<DtItem<Client>> => {
    try {
      return await getFetchService<DtItem<Client>>(`${url}/${page}/list`, query)
    } catch (error) {
      throw error
    }
  },

  getItem: async (id: string): Promise<Client> => {
    try {
      return await getFetchService<Client>(`${url}/${page}/show/${id}`)
    } catch (error) {
      throw error
    }
  },

  deleteItem: async (id: string): Promise<Client> => {
    try {
      return await deleteFetchService<Client>(`${url}/${page}/delete/${id}`)
    } catch (error) {
      throw error
    }
  },
}

export default ClientService
