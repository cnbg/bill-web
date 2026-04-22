<script setup lang="ts">
import { onMounted, provide, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { useDistrictStore, useRegionStore } from '@/stores'
import type { District } from '@/types'
import EditForm from '@/pages/district/EditForm.vue'

const { t } = useI18n()
const router = useRouter()

const regionSt = useRegionStore()
const districtSt = useDistrictStore()

const handleSubmit = async (data: District) => {
  try {
    await districtSt.createItem(data)
    await router.push({ name: 'district.list' })
  } catch (error) {
    // Handle error if needed
  }
}

districtSt.item = {
  id: '',
  regionId: '',
  code: '',
  name: '',
}

const menu = ref([
  { icon: 'pi pi-chevron-left', command: () => router.push({ name: 'district.list' }) },
] as any[])

provide('menu-start-items', menu)

onMounted(async () => {
  await regionSt.getItems({ take: 1000, skip: 0 })
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
