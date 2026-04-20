<script setup lang="ts">
import { onMounted, provide, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { useRateStore } from '@/stores'
import type { Rate } from '@/types'
import RateForm from '@/pages/rate/RateForm.vue'
import MainLayout from '@/layouts/MainLayout.vue'
import dayjs from 'dayjs'

const { t } = useI18n()
const router = useRouter()

const rateSt = useRateStore()

const handleSubmit = async (data: Omit<Rate, 'id'>) => {
  try {
    await rateSt.createItem(data)
    await router.push({ name: 'rate.list' })
  } catch (error) {
    // Handle error if needed
  }
}

const rate = {
  name: '',
  type: 'fix',
  price: null as number | null,
  note: '',
  startDate: dayjs().format('YYYY-MM-DD'),
  endDate: '',
  isActive: true,
}

const menu = ref([
  { icon: 'pi pi-chevron-left', command: () => router.push({ name: 'rate.list' }) },
] as any[])

provide('menu-start-items', menu)

onMounted(async () => {
  rateSt.item = {} as Rate
  menu.value.push({ label: t('create'), disabled: true })
})
</script>

<template>
  <MainLayout>
    <RateForm @submit="handleSubmit" :rate="rateSt.item" />
  </MainLayout>
</template>

<style>
</style>
