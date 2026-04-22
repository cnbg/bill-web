<script setup lang="ts">
import { onMounted, provide, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute, useRouter } from 'vue-router'
import { useClientTypeStore } from '@/stores'
import type { ClientType } from '@/types'
import EditForm from '@/pages/client-type/EditForm.vue'

const { t } = useI18n()
const route = useRoute()
const router = useRouter()
const clientTypeId = route.params.id as string

const clientTypeSt = useClientTypeStore()

const handleSubmit = async (data: ClientType) => {
  try {
    await clientTypeSt.updateItem(clientTypeId, {
      name: data.name,
      isActive: data.isActive
    })
    await router.push({ name: 'client-type.list' })
  } catch (error) {
    // Handle error if needed
  }
}

const menu = ref([
  { icon: 'pi pi-chevron-left', command: () => router.push({ name: 'client-type.list' }) },
] as any[])

provide('menu-start-items', menu)

onMounted(async () => {
  await clientTypeSt.getItem(clientTypeId)
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
