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
  roles: AuthRole[]
  perms: string[]
}

export interface Org {
  id: string
  name: string
}

export interface AuthRole {
  id: string
  name: string
}

export interface LoginResponse {
  accessToken: string
  refreshToken: string
  user: AuthUser
}
