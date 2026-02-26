<script setup lang="ts">
import { onMounted, provide, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useUserStore } from '@/stores'

const route = useRoute()
const router = useRouter()
const userId = route.params.id as string

const userSt = useUserStore()

const menu = ref([
  { icon: 'pi pi-chevron-left', command: () => router.push({ name: 'user.list' }) },
] as any[])

provide('menu-start-items', menu)

onMounted(async () => {
  await userSt.getItem(userId)
  menu.value.push({ label: userSt.name, disabled: true })
})
</script>

<template>
  <MainLayout>
    <div class="card mt-5">
      {{ userSt.name }}
    </div>
  </MainLayout>
</template>

<style>
</style>
