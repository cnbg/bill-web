import { useAuthHttp } from '@/composables'
import type { ListQuery } from '@/types'

export const getFetchService = async <T>(url: string, query?: ListQuery): Promise<T> => {
  const { data, error } = await useAuthHttp<T>(url + '?' + new URLSearchParams(query as any).toString()).get().json()
  if (error.value) {
    throw new Error(error.value?.message || 'error_fetching_data')
  }
  return data.value as T
}

export const postFetchService = async <T>(url: string, body?: any): Promise<T> => {
  const { data, error } = await useAuthHttp<T>(url).post(body).json()
  if (error.value) {
    throw new Error(error.value?.message || 'error_fetching_data')
  }
  return data.value as T
}

export const deleteFetchService = async <T>(url: string, body?: any): Promise<T> => {
  const { data, error } = await useAuthHttp<T>(url).delete(body).json()
  if (error.value) {
    throw new Error(error.value?.message || 'error_fetching_data')
  }
  return data.value as T
}
