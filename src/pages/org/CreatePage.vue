<script setup lang="ts">
import { onMounted, provide, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { useOrgStore, useOrgTypeStore } from '@/stores'
import type { Org } from '@/types'
import EditForm from '@/pages/org/EditForm.vue'

const { t } = useI18n()
const router = useRouter()

const orgSt = useOrgStore()
const orgTypeSt = useOrgTypeStore()

const handleSubmit = async (data: Org) => {
  try {
    await orgSt.createItem(data)
    await router.push({ name: 'org.list' })
  } catch (error) {
    // Handle error if needed
  }
}

orgSt.item = {
  id: '',
  orgTypeId: '',
  name: '',
  okpo: '',
  inn: '',
  balance: 0,
  note: '',
  isActive: false,
}

const menu = ref([
  { icon: 'pi pi-chevron-left', command: () => router.push({ name: 'org.list' }) },
] as any[])

provide('menu-start-items', menu)

onMounted(async () => {
  await orgTypeSt.getItems({ take: 1000, skip: 0 })
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
