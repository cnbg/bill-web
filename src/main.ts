import app from './globals'
import { useAuthStore } from '@/stores'

const auth = useAuthStore()
await auth.sync()

app.mount('#app')
