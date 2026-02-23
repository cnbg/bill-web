<script setup lang="ts">
import { onMounted, provide, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute, useRouter } from 'vue-router'
import { useRegionStore } from '@/stores'

const { t } = useI18n()
const route = useRoute()
const router = useRouter()
const regionId = route.params.id as string

const regionSt = useRegionStore()

const menu = ref([
  { icon: 'pi pi-chevron-left', command: () => router.push({ name: 'region.list' }) },
] as any[])

provide('menu-start-items', menu)

onMounted(async () => {
  await regionSt.getItem(regionId)
  menu.value.push({ label: regionSt.item.name, disabled: true })
})
</script>

<template>
  <MainLayout>
    <div class="card mt-5">
      {{ regionSt.item.name }}
    </div>
  </MainLayout>
</template>

<style>
</style>
