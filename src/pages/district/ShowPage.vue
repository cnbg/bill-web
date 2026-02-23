<script setup lang="ts">
import { onMounted, provide, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute, useRouter } from 'vue-router'
import { useDistrictStore } from '@/stores'

const { t } = useI18n()
const route = useRoute()
const router = useRouter()
const districtId = route.params.id as string

const districtSt = useDistrictStore()

const menu = ref([
  { icon: 'pi pi-chevron-left', command: () => router.push({ name: 'district.list' }) },
] as any[])

provide('menu-start-items', menu)

onMounted(async () => {
  await districtSt.getItem(districtId)
  menu.value.push({ label: districtSt.item.name, disabled: true })
})
</script>

<template>
  <MainLayout>
    <div class="card mt-5">
      {{ districtSt.item.name }}
    </div>
  </MainLayout>
</template>

<style>
</style>
