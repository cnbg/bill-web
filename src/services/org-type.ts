import { deleteFetchService, getFetchService, postFetchService, putFetchService } from './base'
import type { DtItem, ListQuery, OrgType } from '@/types'

const url = import.meta.env.VITE_API_URL! + '/v1'
const page = 'orgtype'

const OrgTypeService = {
  getItems: async (query: ListQuery): Promise<DtItem<OrgType>> => {
    try {
      return await getFetchService<DtItem<OrgType>>(`${url}/${page}/list`, query)
    } catch (error) {
      throw error
    }
  },

  getItem: async (id: string): Promise<OrgType> => {
    try {
      return await getFetchService<OrgType>(`${url}/${page}/show/${id}`)
    } catch (error) {
      throw error
    }
  },

  createItem: async (data: Partial<OrgType>): Promise<OrgType> => {
    try {
      return await postFetchService<OrgType>(`${url}/${page}/create`, data)
    } catch (error) {
      throw error
    }
  },

  updateItem: async (id: string, data: Partial<OrgType>): Promise<OrgType> => {
    try {
      return await putFetchService<OrgType>(`${url}/${page}/update/${id}`, data)
    } catch (error) {
      throw error
    }
  },

  deleteItem: async (id: string): Promise<OrgType> => {
    try {
      return await deleteFetchService<OrgType>(`${url}/${page}/delete/${id}`)
    } catch (error) {
      throw error
    }
  },
}

export default OrgTypeService
