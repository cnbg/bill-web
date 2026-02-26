import { useAuthHttp } from '@/composables'
import type { ListQuery } from '@/types'
import { toQueryString } from '@/utils'

export const getFetchService = async <T>(url: string, query?: ListQuery): Promise<T> => {
  const params = query ? '?' + toQueryString(query as Record<string, any>) : ''
  const { data, error, statusCode } = await useAuthHttp<T>(url + params).get()
  if (error.value) {
    throw new Error(error.value?.message || 'error_fetching_data')
  }
  try {
    return JSON.parse(data.value as any) as T
  } catch (e) {
    return {} as T
  }
}

export const postFetchService = async <T>(url: string, body?: any): Promise<T> => {
  const { data, error, statusCode } = await useAuthHttp<T>(url).post(body)
  if (error.value) {
    throw new Error(error.value?.message || 'error_saving_data')
  }
  try {
    return JSON.parse(data.value as any) as T
  } catch (e) {
    return {} as T
  }
}

export const putFetchService = async <T>(url: string, body?: any): Promise<T> => {
  const { data, error, statusCode } = await useAuthHttp<T>(url).put(body)
  if (error.value) {
    throw new Error(error.value?.message || 'error_saving_data')
  }
  try {
    return JSON.parse(data.value as any) as T
  } catch (e) {
    return {} as T
  }
}

export const deleteFetchService = async <T>(url: string, body?: any): Promise<T> => {
  const { data, error, statusCode } = await useAuthHttp<T>(url).delete(body)
  if (error.value) {
    throw new Error(error.value?.message || 'error_deleting_data')
  }
  try {
    return JSON.parse(data.value as any) as T
  } catch (e) {
    return {} as T
  }
}
