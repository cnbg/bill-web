export interface AuthUser {
  id: number
  firstName: string
  lastName: string
  email: string
  photo?: string,
  org?: Org,
  roles: string[],
  type: string
  lang: string
  theme: string
  perms: string[]
}

export interface Org {
  id: number
  name: string
}

export interface LoginRequest {
  email: string
  password: string
}

export interface LoginResponse {
  accessToken: string
  refreshToken: string
  user: AuthUser
}
