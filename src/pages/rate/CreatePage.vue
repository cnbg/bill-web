<script setup lang="ts">
import { onMounted, provide, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { useRateStore } from '@/stores'
import type { Rate } from '@/types'
import RateForm from '@/pages/rate/EditForm.vue'
import MainLayout from '@/layouts/MainLayout.vue'

const { t } = useI18n()
const router = useRouter()

const rateSt = useRateStore()

const handleSubmit = async (data: Partial<Rate>) => {
  try {
    await rateSt.createItem(data)
    await router.push({ name: 'rate.list' })
  } catch (error) {
    // Handle error if needed
  }
}

rateSt.item = {
  id: '',
  name: '',
  price: 0,
  type: '',
  note: '',
  isActive: true,
  startDate: '',
  endDate: ''
}

const menu = ref([
  { icon: 'pi pi-chevron-left', command: () => router.push({ name: 'rate.list' }) },
] as any[])

provide('menu-start-items', menu)

onMounted(async () => {
  menu.value.push({ label: t('create'), disabled: true })
})
</script>

<template>
  <MainLayout>
    <RateForm @submit="handleSubmit" />
  </MainLayout>
</template>

<style>
</style>
