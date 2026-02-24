<script setup lang="ts">
import { onMounted, provide, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute, useRouter } from 'vue-router'
import { useClientTypeStore } from '@/stores'

const { t } = useI18n()
const route = useRoute()
const router = useRouter()
const clientTypeId = route.params.id as string

const clientTypeSt = useClientTypeStore()

const menu = ref([
  { icon: 'pi pi-chevron-left', command: () => router.push({ name: 'client-type.list' }) },
] as any[])

provide('menu-start-items', menu)

onMounted(async () => {
  await clientTypeSt.getItem(clientTypeId)
  menu.value.push({ label: clientTypeSt.item.name, disabled: true })
})
</script>

<template>
  <MainLayout>
    <div class="card mt-5">
      {{ clientTypeSt.item.name }}
    </div>
  </MainLayout>
</template>

<style>
</style>
