<script setup lang="ts">
import { onMounted, provide, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { useRoleStore } from '@/stores'
import type { Role } from '@/types'
import EditForm from '@/pages/role/EditForm.vue'

const { t } = useI18n()
const router = useRouter()

const roleSt = useRoleStore()

const handleSubmit = async (data: Role) => {
  try {
    await roleSt.createItem({
      name: data.name,
      note: data.note,
      isActive: data.isActive
    })
    await router.push({ name: 'role.list' })
  } catch (error) {
    // Handle error if needed
  }
}

roleSt.item = {
  id: '',
  name: '',
  note: '',
  isActive: false,
  perms: [],
}

const menu = ref([
  { icon: 'pi pi-chevron-left', command: () => router.push({ name: 'role.list' }) },
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
