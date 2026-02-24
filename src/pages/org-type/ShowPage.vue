<script setup lang="ts">
import { onMounted, provide, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute, useRouter } from 'vue-router'
import { useOrgTypeStore } from '@/stores'

const { t } = useI18n()
const route = useRoute()
const router = useRouter()
const orgTypeId = route.params.id as string

const orgTypeSt = useOrgTypeStore()

const menu = ref([
  { icon: 'pi pi-chevron-left', command: () => router.push({ name: 'org-type.list' }) },
] as any[])

provide('menu-start-items', menu)

onMounted(async () => {
  await orgTypeSt.getItem(orgTypeId)
  menu.value.push({ label: orgTypeSt.item.name, disabled: true })
})
</script>

<template>
  <MainLayout>
    <div class="card mt-5">
      {{ orgTypeSt.item.name }}
    </div>
  </MainLayout>
</template>

<style>
</style>
