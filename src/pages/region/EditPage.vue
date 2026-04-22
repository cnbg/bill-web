<script setup lang="ts">
import { onMounted, provide, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute, useRouter } from 'vue-router'
import { useRegionStore } from '@/stores'
import type { Region } from '@/types'
import EditForm from '@/pages/region/EditForm.vue'

const { t } = useI18n()
const route = useRoute()
const router = useRouter()
const regionId = route.params.id as string

const regionSt = useRegionStore()

const handleSubmit = async (data: Region) => {
  try {
    await regionSt.updateItem(regionId, data)
    await router.push({ name: 'region.list' })
  } catch (error) {
    // Handle error if needed
  }
}

const menu = ref([
  { icon: 'pi pi-chevron-left', command: () => router.push({ name: 'region.list' }) },
] as any[])

provide('menu-start-items', menu)

onMounted(async () => {
  await regionSt.getItem(regionId)
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
