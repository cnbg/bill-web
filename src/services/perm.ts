import { getFetchService } from './base'

const url = import.meta.env.VITE_API_URL! + '/v1'
const page = 'perm'

const PermService = {
  getItems: async (): Promise<string[]> => {
    try {
      return await getFetchService<string[]>(`${url}/${page}/list`)
    } catch (error) {
      throw error
    }
  },
}

export default PermService
