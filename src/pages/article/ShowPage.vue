<script setup lang="ts">
import { onMounted, provide, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useArticleStore } from '@/stores'

const route = useRoute()
const router = useRouter()
const articleId = route.params.id as string

const articleSt = useArticleStore()

const menu = ref([
  { icon: 'pi pi-chevron-left', command: () => router.push({ name: 'article.list' }) },
] as any[])

provide('menu-start-items', menu)

onMounted(async () => {
  await articleSt.getItem(articleId)
  menu.value.push({ label: '', disabled: true })
})
</script>

<template>
  <MainLayout>
    <div class="card mt-5">
      <h3 class="text-2xl">{{ articleSt.item.name }}</h3>
      <hr class="my-5">
      <span v-html="articleSt.item.content" />
    </div>
  </MainLayout>
</template>

<style>
</style>
