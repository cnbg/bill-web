<script setup lang="ts">
import { onMounted, provide, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute, useRouter } from 'vue-router'
import { useClientStore } from '@/stores'

const { t } = useI18n()
const router = useRouter()

const clientSt = useClientStore()

const menu = ref([
  { icon: 'pi pi-chevron-left', command: () => router.push({ name: 'client.list' }) },
] as any[])

provide('menu-start-items', menu)

onMounted(async () => {
  menu.value.push({ label: t('create'), disabled: true })
})
</script>

<template>
  <MainLayout>
    <div class="card mt-5">
      страница создания клиента
      в разработке
    </div>
  </MainLayout>
</template>

<style>
</style>
