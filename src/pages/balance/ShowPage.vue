<script setup lang="ts">
import { onMounted, provide, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useBalanceStore } from '@/stores'

const route = useRoute()
const router = useRouter()
const balanceId = route.params.id as string

const balanceSt = useBalanceStore()

const menu = ref([
  { icon: 'pi pi-chevron-left', command: () => router.push({ name: 'balance.list' }) },
] as any[])

provide('menu-start-items', menu)

onMounted(async () => {
  await balanceSt.getItem(balanceId)
  menu.value.push({ label: '', disabled: true })
})
</script>

<template>
  <MainLayout>
    <div class="card mt-5">
      {{ balanceSt.item.start }}
    </div>
  </MainLayout>
</template>

<style>
</style>
