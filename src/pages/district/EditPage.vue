<script setup lang="ts">
import { onMounted, provide, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute, useRouter } from 'vue-router'
import { useDistrictStore, useRegionStore } from '@/stores'
import type { District } from '@/types'
import EditForm from '@/pages/district/EditForm.vue'

const { t } = useI18n()
const route = useRoute()
const router = useRouter()
const districtId = route.params.id as string

const regionSt = useRegionStore()
const districtSt = useDistrictStore()

const handleSubmit = async (data: District) => {
  try {
    await districtSt.updateItem(districtId, data)
    await router.push({ name: 'district.list' })
  } catch (error) {
    // Handle error if needed
  }
}

const menu = ref([
  { icon: 'pi pi-chevron-left', command: () => router.push({ name: 'district.list' }) },
] as any[])

provide('menu-start-items', menu)

onMounted(async () => {
  await regionSt.getItems({ take: 1000, skip: 0 })
  await districtSt.getItem(districtId)
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
