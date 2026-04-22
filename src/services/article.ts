import { deleteFetchService, getFetchService, postFetchService, putFetchService } from './base'
import type { DtItem, ListQuery, Article } from '@/types'

const url = import.meta.env.VITE_API_URL! + '/v1'
const page = 'article'

const ArticleService = {
  getItems: async (query: ListQuery): Promise<DtItem<Article>> => {
    try {
      return await getFetchService<DtItem<Article>>(`${url}/${page}/list`, query)
    } catch (error) {
      throw error
    }
  },

  getItem: async (id: string): Promise<Article> => {
    try {
      return await getFetchService<Article>(`${url}/${page}/show/${id}`)
    } catch (error) {
      throw error
    }
  },

  createItem: async (data: Partial<Article>): Promise<Article> => {
    try {
      return await postFetchService<Article>(`${url}/${page}/create`, data)
    } catch (error) {
      throw error
    }
  },

  updateItem: async (id: string, data: Partial<Article>): Promise<Article> => {
    try {
      return await putFetchService<Article>(`${url}/${page}/update/${id}`, data)
    } catch (error) {
      throw error
    }
  },

  deleteItem: async (id: string): Promise<Article> => {
    try {
      return await deleteFetchService<Article>(`${url}/${page}/delete/${id}`)
    } catch (error) {
      throw error
    }
  },
}

export default ArticleService
