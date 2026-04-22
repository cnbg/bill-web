import { deleteFetchService, getFetchService, postFetchService, putFetchService } from './base'
import type { DtItem, ListQuery, ClientType } from '@/types'

const url = import.meta.env.VITE_API_URL! + '/v1'
const page = 'clienttype'

const ClientTypeService = {
  getItems: async (query: ListQuery): Promise<DtItem<ClientType>> => {
    try {
      return await getFetchService<DtItem<ClientType>>(`${url}/${page}/list`, query)
    } catch (error) {
      throw error
    }
  },

  getItem: async (id: string): Promise<ClientType> => {
    try {
      return await getFetchService<ClientType>(`${url}/${page}/show/${id}`)
    } catch (error) {
      throw error
    }
  },

  createItem: async (data: Partial<ClientType>): Promise<ClientType> => {
    try {
      return await postFetchService<ClientType>(`${url}/${page}/create`, data)
    } catch (error) {
      throw error
    }
  },

  updateItem: async (id: string, data: Partial<ClientType>): Promise<ClientType> => {
    try {
      return await putFetchService<ClientType>(`${url}/${page}/update/${id}`, data)
    } catch (error) {
      throw error
    }
  },


  deleteItem: async (id: string): Promise<ClientType> => {
    try {
      return await deleteFetchService<ClientType>(`${url}/${page}/delete/${id}`)
    } catch (error) {
      throw error
    }
  },
}

export default ClientTypeService
