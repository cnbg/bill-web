<script setup lang="ts">
import { onMounted, provide, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute, useRouter } from 'vue-router'
import { useClientStore } from '@/stores'

const { t } = useI18n()
const route = useRoute()
const router = useRouter()
const clientId = route.params.id as string

const clientSt = useClientStore()

const menu = ref([
  { icon: 'pi pi-chevron-left', command: () => router.push({ name: 'client.list' }) },
] as any[])

provide('menu-start-items', menu)

onMounted(async () => {
  await clientSt.getItem(clientId)
  menu.value.push({ label: clientSt.item.account, disabled: true })
})
</script>

<template>
  <MainLayout>
    <div class="card mt-5">
      {{ clientSt.item.account }}
    </div>
  </MainLayout>
</template>

<style>
</style>
