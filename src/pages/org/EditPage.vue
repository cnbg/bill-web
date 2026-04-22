<script setup lang="ts">
import { onMounted, provide, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute, useRouter } from 'vue-router'
import { useOrgStore, useOrgTypeStore } from '@/stores'
import type { Org } from '@/types'
import EditForm from '@/pages/org/EditForm.vue'

const { t } = useI18n()
const route = useRoute()
const router = useRouter()
const orgId = route.params.id as string

const orgSt = useOrgStore()
const orgTypeSt = useOrgTypeStore()

const handleSubmit = async (data: Org) => {
  try {
    await orgSt.updateItem(orgId, data)
    await router.push({ name: 'org.list' })
  } catch (error) {
    // Handle error if needed
  }
}

const menu = ref([
  { icon: 'pi pi-chevron-left', command: () => router.push({ name: 'org.list' }) },
] as any[])

provide('menu-start-items', menu)

onMounted(async () => {
  await orgTypeSt.getItems({ take: 1000, skip: 0 })
  await orgSt.getItem(orgId)
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
