import { defineStore } from 'pinia'
import { useFetch } from '@vueuse/core'
import { useAuthHttp } from '@/composables'
import { cookie, getLocale, getTheme, goto, isValidEmail, parseJwt } from '@/utils'
import type { AuthUser, LoginRequest, LoginResponse } from '@/types'

interface AuthState {
  user: AuthUser
  username: string
  password: string
  loading: boolean
  errors: string[]
  error: string
  locale: string
  theme: string
  jwtExp: number
  locales: { key: string; name: string }[]
}

const baseUrl = import.meta.env.VITE_API_URL!

export const useAuthStore = defineStore('auth-store', {
  state: (): AuthState => ({
    user: {} as AuthUser,
    username: '',
    password: '',
    loading: false,
    errors: [],
    error: '',
    locale: getLocale(),
    theme: getTheme(),
    jwtExp: 0,
    locales: [
      { key: 'ru', name: 'Русский' },
      { key: 'en', name: 'English' },
    ],
  }),
  getters: {
    isAuth: (state: AuthState) => state.jwtExp * 1000 > Date.now(),
    name: (state: AuthState): string => `${state.user?.firstName} ${state.user?.lastName}`.trim(),
  },
  actions: {
    async profile() {
      this.loading = true
      this.errors = []

      const { data, error } = await useAuthHttp<AuthUser>('/v1/auth/profile').get().json()

      if (error.value) {
        this.errors.push(error.value.message || 'error_fetching_data')
      } else if (data.value) {
        this.user = data.value as AuthUser
      }

      await this.setLocale(this.user.lang)
      await this.setTheme(this.user.theme)

      this.loading = false
    },
    async login() {
      this.loading = true
      this.errors = []

      if (!this.username) {
        this.errors.push('enter_your_email')
      } else if (!isValidEmail(this.username)) {
        this.errors.push('enter_valid_email')
      }
      if (!this.password) {
        this.errors.push('enter_your_password')
      } else if (this.password.length < 6) {
        this.errors.push('password_length_error')
      }
      if (this.errors.length > 0) {
        this.loading = false
        return
      }

      const { data, error } = await useFetch<LoginResponse>(baseUrl + '/v1/auth/login').post({
        username: this.username,
        password: this.password,
      } as LoginRequest).json()

      if (error.value) {
        this.errors.push(error.value.message || 'invalid_username_or_password')
      } else if (data.value) {
        await this.setData(data.value)
      }

      this.loading = false
    },
    async refresh() {
      this.loading = true
      this.errors = []

      const refreshToken = await cookie.get('refresh')
      if (!refreshToken) {
        this.loading = false
        await this.logout()
        return
      }
      const { data, error } = await useFetch<LoginResponse>(baseUrl + '/v1/auth/refresh').post({
        refresh: refreshToken,
      }).json()

      if (error.value) {
        await this.logout()
      } else if (data.value) {
        await this.setData(data.value)
      }

      this.loading = false
    },
    async logout() {
      this.$reset()

      //const refreshToken = await cookie.get('refresh')
      //await useFetch('/auth/revoke').post({ refresh: refreshToken })

      await this.cleanCookies()
      goto('/auth/login')
    },
    async setData(data: LoginResponse) {
      this.user = data.user as AuthUser

      await this.cleanCookies()

      const accessToken = data.accessToken
      const refreshToken = data.refreshToken
      this.jwtExp = parseJwt(accessToken)?.exp ?? 0
      if (accessToken || refreshToken) {
        await this.setCookies(accessToken, refreshToken)
      } else {
        this.errors.push('error_fetching_data')
      }
    },
    async setCookies(accessToken: string, refreshToken: string) {
      cookie.set('access', accessToken, { days: 1 })
      cookie.set('refresh', refreshToken, { days: 90 })
    },
    async cleanCookies() {
      cookie.delete('access')
      cookie.delete('refresh')
    },
    async setLocale(locale?: string, save = false) {
      if (locale !== undefined) {
        this.locale = ['ru', 'en'].find(l => l === locale) ?? this.locale
      }
      localStorage.setItem('locale', this.locale)
      if (save) await useAuthHttp('/v1/auth/update').put({ lang: this.locale }).json()
    },
    async setTheme(theme?: string, save = false) {
      if (theme !== undefined) {
        this.theme = ['light', 'dark'].find(t => t === theme) ?? this.theme
      }
      localStorage.setItem('theme', this.theme)

      if (this.theme === 'dark') {
        document.documentElement.classList.add('p-dark')
      } else {
        document.documentElement.classList.remove('p-dark')
      }
      if (save) await useAuthHttp('/v1/auth/update').put({ theme: this.theme }).json()
    },
    async sync() {
      this.jwtExp = parseJwt(await cookie.get('access') || '')?.exp ?? 0
      await this.setLocale()
      await this.setTheme()
    },
  },
})
