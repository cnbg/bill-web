import { useAuthHttp } from '@/composables'

export const getFetchService = async <T>(url: string): Promise<T> => {
  const { data, error } = await useAuthHttp<T>(url).get().json()
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
  const { data, error } = await useAuthHttp<T>(url).post(body).json()
  if (error.value) {
    throw new Error(error.value?.message || 'error_fetching_data')
  }
  return data.value as T
}
