<script setup lang="ts">
import { onMounted, provide, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { useArticleStore, useRegionStore } from '@/stores'
import type { Article } from '@/types'
import EditForm from '@/pages/article/EditForm.vue'

const { t } = useI18n()
const router = useRouter()

const regionSt = useRegionStore()
const articleSt = useArticleStore()

const handleSubmit = async (data: Article) => {
  try {
    await articleSt.createItem(data)
    await router.push({ name: 'article.list' })
  } catch (error) {
    // Handle error if needed
  }
}

articleSt.item = {
  id: '',
  name: '',
  content: ''
}

const menu = ref([
  { icon: 'pi pi-chevron-left', command: () => router.push({ name: 'article.list' }) },
] as any[])

provide('menu-start-items', menu)

onMounted(async () => {
  await regionSt.getItems({ take: 1000, skip: 0 })
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
