import app from './primevue'

import MainLayout from '@/layouts/MainLayout.vue'
import MyDataTable from '@/components/MyDataTable.vue'

app.component('MainLayout', MainLayout)
app.component('MyDataTable', MyDataTable)

export default app
