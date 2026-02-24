<script setup lang="ts">
import { onMounted, provide, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useChargeStore } from '@/stores'

const route = useRoute()
const router = useRouter()
const chargeId = route.params.id as string

const chargeSt = useChargeStore()

const menu = ref([
  { icon: 'pi pi-chevron-left', command: () => router.push({ name: 'charge.list' }) },
] as any[])

provide('menu-start-items', menu)

onMounted(async () => {
  await chargeSt.getItem(chargeId)
  menu.value.push({ label: chargeSt.item.account, disabled: true })
})
</script>

<template>
  <MainLayout>
    <div class="card mt-5">
      {{ chargeSt.item.account }}
    </div>
  </MainLayout>
</template>

<style>
</style>
