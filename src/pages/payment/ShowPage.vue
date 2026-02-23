<script setup lang="ts">
import { onMounted, provide, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { usePaymentStore } from '@/stores'

const route = useRoute()
const router = useRouter()
const paymentId = route.params.id as string

const paymentSt = usePaymentStore()

const menu = ref([
  { icon: 'pi pi-chevron-left', command: () => router.push({ name: 'payment.list' }) },
] as any[])

provide('menu-start-items', menu)

onMounted(async () => {
  await paymentSt.getItem(paymentId)
  menu.value.push({ label: paymentSt.item.account, disabled: true })
})
</script>

<template>
  <MainLayout>
    <div class="card mt-5">
      {{ paymentSt.item.account }}
    </div>
  </MainLayout>
</template>

<style>
</style>
