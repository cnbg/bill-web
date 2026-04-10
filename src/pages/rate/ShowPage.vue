<script setup lang="ts">
import { onMounted, provide, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute, useRouter } from 'vue-router'
import { useRateStore } from '@/stores'

const { t } = useI18n()
const route = useRoute()
const router = useRouter()
const rateId = route.params.id as string

const rateSt = useRateStore()

const menu = ref([
  { icon: 'pi pi-chevron-left', command: () => router.push({ name: 'rate.list' }) },
] as any[])

provide('menu-start-items', menu)

onMounted(async () => {
  await rateSt.getItem(rateId)
  menu.value.push({ label: rateSt.item.name, disabled: true })
})
</script>

<template>
  <MainLayout>
    <div class="card mt-5">
      {{ rateSt.item.name }}
    </div>
  </MainLayout>
</template>

<style>
</style>
