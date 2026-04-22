<script setup lang="ts">
import { onMounted, provide, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute, useRouter } from 'vue-router'
import { useExpenseStore } from '@/stores'
import type { Expense } from '@/types'
import EditForm from '@/pages/expense/EditForm.vue'

const { t } = useI18n()
const route = useRoute()
const router = useRouter()
const expenseId = route.params.id as string

const expenseSt = useExpenseStore()

const handleSubmit = async (data: Expense) => {
  try {
    await expenseSt.updateItem(expenseId, data)
    await router.push({ name: 'expense.list' })
  } catch (error) {
    // Handle error if needed
  }
}

const menu = ref([
  { icon: 'pi pi-chevron-left', command: () => router.push({ name: 'expense.list' }) },
] as any[])

provide('menu-start-items', menu)

onMounted(async () => {
  await expenseSt.getItem(expenseId)
  menu.value.push({ label: t('edit'), disabled: true })
})
</script>

<template>
  <MainLayout>
    <EditForm @submit="handleSubmit" />
  </MainLayout>
</template>

<style>
</style>
