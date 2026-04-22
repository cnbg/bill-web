<script setup lang="ts">
import { onMounted, provide, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { useClientTypeStore } from '@/stores'
import type { ClientType } from '@/types'
import EditForm from '@/pages/client-type/EditForm.vue'

const { t } = useI18n()
const router = useRouter()

const clientTypeSt = useClientTypeStore()

const handleSubmit = async (data: ClientType) => {
  try {
    await clientTypeSt.createItem({
      name: data.name,
      isActive: data.isActive
    })
    await router.push({ name: 'client-type.list' })
  } catch (error) {
    // Handle error if needed
  }
}

clientTypeSt.item = {
  id: '',
  name: '',
  isActive: false,
}

const menu = ref([
  { icon: 'pi pi-chevron-left', command: () => router.push({ name: 'client-type.list' }) },
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
