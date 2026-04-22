<script setup lang="ts">
import { onMounted, provide, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { useExpenseStore } from '@/stores'
import type { Expense } from '@/types'
import EditForm from '@/pages/expense/EditForm.vue'

const { t } = useI18n()
const router = useRouter()

const expenseSt = useExpenseStore()

const handleSubmit = async (data: Expense) => {
  try {
    await expenseSt.createItem(data)
    await router.push({ name: 'expense.list' })
  } catch (error) {
    // Handle error if needed
  }
}

expenseSt.item = {
  id: '',
  orgId: null,
  amount: 0,
  status: '',
  year: new Date().getFullYear(),
  month: new Date().getMonth() + 1,
  note: '',
}

const menu = ref([
  { icon: 'pi pi-chevron-left', command: () => router.push({ name: 'expense.list' }) },
] as any[])

provide('menu-start-items', menu)

onMounted(async () => {
  menu.value.push({ label: t('create'), disabled: true })
})
</script>

<template>
  <MainLayout>
    <EditForm @submit="handleSubmit" />
  </MainLayout>
</template>

<style>
</style>
