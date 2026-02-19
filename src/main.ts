import app from './globals.ts'
import { useAuthStore } from '@/stores'

const auth = useAuthStore()
await auth.sync()

import './assets/main.css'

app.mount('#app')
