<script setup lang="ts">
import { onMounted, provide, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { useRegionStore } from '@/stores'
import type { Region } from '@/types'
import EditForm from '@/pages/region/EditForm.vue'

const { t } = useI18n()
const router = useRouter()

const regionSt = useRegionStore()

const handleSubmit = async (data: Region) => {
  try {
    await regionSt.createItem(data)
    await router.push({ name: 'region.list' })
  } catch (error) {
    // Handle error if needed
  }
}

regionSt.item = {
  id: '',
  code: '',
  name: '',
}

const menu = ref([
  { icon: 'pi pi-chevron-left', command: () => router.push({ name: 'region.list' }) },
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
