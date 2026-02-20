import { getFetchService, postFetchService } from './base'
import type { DtItem, Org } from '@/types'

const url = import.meta.env.VITE_API_URL! + '/v1'
const page = 'org'

const OrgService = {
  getItems: async (): Promise<DtItem<Org>> => {
    try {
      return await getFetchService<DtItem<Org>>(`${url}/${page}/list`)
    } catch (error) {
      throw error
    }
  },

  getItem: async (id: string): Promise<Org> => {
    try {
      return await getFetchService<Org>(`${url}/${page}/show/${id}`)
    } catch (error) {
      throw error
    }
  },

  deleteItems: async (ids: string[]): Promise<Org> => {
    try {
      return await postFetchService<Org>(`${url}/${page}/delete`, ids)
    } catch (error) {
      throw error
    }
  },
}

export default OrgService
