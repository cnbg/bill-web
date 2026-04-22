<script setup lang="ts">
import { onMounted, provide, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute, useRouter } from 'vue-router'
import { useRateStore } from '@/stores'
import type { Rate } from '@/types'
import EditForm from '@/pages/rate/EditForm.vue'

const { t } = useI18n()
const route = useRoute()
const router = useRouter()
const rateId = route.params.id as string

const rateSt = useRateStore()

const handleSubmit = async (data: Partial<Rate>) => {
  try {
    await rateSt.updateItem(rateId, data)
    await router.push({ name: 'rate.list' })
  } catch (error) {
    // Handle error if needed
  }
}

const menu = ref([
  { icon: 'pi pi-chevron-left', command: () => router.push({ name: 'rate.list' }) },
] as any[])

provide('menu-start-items', menu)

onMounted(async () => {
  await rateSt.getItem(rateId)
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
