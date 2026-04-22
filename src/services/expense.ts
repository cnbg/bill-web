import { deleteFetchService, getFetchService, postFetchService, putFetchService } from './base'
import type { DtItem, ListQuery, Expense } from '@/types'

const url = import.meta.env.VITE_API_URL! + '/v1'
const page = 'expense'

const ExpenseService = {
  getItems: async (query: ListQuery): Promise<DtItem<Expense>> => {
    try {
      return await getFetchService<DtItem<Expense>>(`${url}/${page}/list`, query)
    } catch (error) {
      throw error
    }
  },

  getItem: async (id: string): Promise<Expense> => {
    try {
      return await getFetchService<Expense>(`${url}/${page}/show/${id}`)
    } catch (error) {
      throw error
    }
  },

  createItem: async (data: Partial<Expense>): Promise<Expense> => {
    try {
      return await postFetchService<Expense>(`${url}/${page}/create`, data)
    } catch (error) {
      throw error
    }
  },

  updateItem: async (id: string, data: Partial<Expense>): Promise<Expense> => {
    try {
      return await putFetchService<Expense>(`${url}/${page}/update/${id}`, data)
    } catch (error) {
      throw error
    }
  },

  deleteItem: async (id: string): Promise<Expense> => {
    try {
      return await deleteFetchService<Expense>(`${url}/${page}/delete/${id}`)
    } catch (error) {
      throw error
    }
  },
}

export default ExpenseService
