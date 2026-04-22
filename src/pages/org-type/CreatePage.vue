<script setup lang="ts">
import { onMounted, provide, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { useOrgTypeStore } from '@/stores'
import type { OrgType } from '@/types'
import EditForm from '@/pages/org-type/EditForm.vue'

const { t } = useI18n()
const router = useRouter()

const orgTypeSt = useOrgTypeStore()

const handleSubmit = async (data: OrgType) => {
  try {
    await orgTypeSt.createItem({
      name: data.name,
      isActive: data.isActive
    })
    await router.push({ name: 'org-type.list' })
  } catch (error) {
    // Handle error if needed
  }
}

orgTypeSt.item = {
  id: '',
  name: '',
  isActive: false,
}

const menu = ref([
  { icon: 'pi pi-chevron-left', command: () => router.push({ name: 'org-type.list' }) },
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
