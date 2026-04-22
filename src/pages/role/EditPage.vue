<script setup lang="ts">
import { onMounted, provide, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute, useRouter } from 'vue-router'
import { useRoleStore } from '@/stores'
import type { Role } from '@/types'
import EditForm from '@/pages/role/EditForm.vue'

const { t } = useI18n()
const route = useRoute()
const router = useRouter()
const roleId = route.params.id as string

const roleSt = useRoleStore()

const handleSubmit = async (data: Role) => {
  try {
    await roleSt.updateItem(roleId, {
      name: data.name,
      note: data.note,
      isActive: data.isActive
    })
    await router.push({ name: 'role.list' })
  } catch (error) {
    // Handle error if needed
  }
}

const menu = ref([
  { icon: 'pi pi-chevron-left', command: () => router.push({ name: 'role.list' }) },
] as any[])

provide('menu-start-items', menu)

onMounted(async () => {
  await roleSt.getItem(roleId)
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
