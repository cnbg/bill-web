export interface AuthUser {
  id: string
  name: string
  email: string
  photo?: string
  type: string
  locale: string
  theme: string
  org: Org
  orgs: Org[]
  roles: string[]
  perms: string[]
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
