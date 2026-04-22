<script setup lang="ts">
import { onMounted, provide, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute, useRouter } from 'vue-router'
import { useOrgTypeStore } from '@/stores'
import type { OrgType } from '@/types'
import EditForm from '@/pages/org-type/EditForm.vue'

const { t } = useI18n()
const route = useRoute()
const router = useRouter()
const orgTypeId = route.params.id as string

const orgTypeSt = useOrgTypeStore()

const handleSubmit = async (data: OrgType) => {
  try {
    await orgTypeSt.updateItem(orgTypeId, {
      name: data.name,
      isActive: data.isActive
    })
    await router.push({ name: 'org-type.list' })
  } catch (error) {
    // Handle error if needed
  }
}

const menu = ref([
  { icon: 'pi pi-chevron-left', command: () => router.push({ name: 'org-type.list' }) },
] as any[])

provide('menu-start-items', menu)

onMounted(async () => {
  await orgTypeSt.getItem(orgTypeId)
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
