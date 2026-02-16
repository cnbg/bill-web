export interface AuthUser {
  id: string
  name: string
  email: string
  photo?: string
  org_id?: string
  org_name: string
  type: string
  locale: string
  theme: string
}

export interface Org {
  id: number
  name: string
}

export interface LoginResponse {
  access_token: string
  refresh_token: string
  user: AuthUser
}
