<script setup lang="ts">
import { onMounted, provide, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute, useRouter } from 'vue-router'
import { useArticleStore, useRegionStore } from '@/stores'
import type { Article } from '@/types'
import EditForm from '@/pages/article/EditForm.vue'

const { t } = useI18n()
const route = useRoute()
const router = useRouter()
const articleId = route.params.id as string

const regionSt = useRegionStore()
const articleSt = useArticleStore()

const handleSubmit = async (data: Article) => {
  try {
    await articleSt.updateItem(articleId, data)
    await router.push({ name: 'article.list' })
  } catch (error) {
    // Handle error if needed
  }
}

const menu = ref([
  { icon: 'pi pi-chevron-left', command: () => router.push({ name: 'article.list' }) },
] as any[])

provide('menu-start-items', menu)

onMounted(async () => {
  await regionSt.getItems({ take: 1000, skip: 0 })
  await articleSt.getItem(articleId)
  menu.value.push({ label: t('edit'), disabled: true })
})
</script>

<template>
  <MainLayout>
    <EditForm @submit="handleSubmit" />
  </MainLayout>
</template>

<style>
</style>
