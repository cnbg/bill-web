<script setup lang="ts">
import { onMounted, provide, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute, useRouter } from 'vue-router'
import { useOrgStore } from '@/stores'

const { t } = useI18n()
const route = useRoute()
const router = useRouter()
const orgId = route.params.id as string

const orgSt = useOrgStore()

const menu = ref([
  { icon: 'pi pi-chevron-left', command: () => router.push({ name: 'org.list' }) },
] as any[])

provide('menu-start-items', menu)

onMounted(async () => {
  await orgSt.getItem(orgId)
  menu.value.push({ label: '', disabled: true })
})
</script>

<template>
  <MainLayout>
    <div class="card mt-5">
      {{ orgSt.item.name }}
    </div>
  </MainLayout>
</template>

<style>
</style>
