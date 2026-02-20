<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { toastEvent } from '@/utils'
import { useAuthStore, usePaymentStore } from '@/stores'
import MyDataTable from '@/components/MyDataTable.vue'
import type { Payment } from '@/types'

const router = useRouter()
const auth = useAuthStore()
const paymentSt = usePaymentStore()

const cm = ref()
const selectedPayment = ref<Payment>({} as Payment)
const menuModel = ref([
  { label: 'View', icon: 'pi pi-fw pi-search', command: () => viewPayment(selectedPayment) },
  { label: 'Delete', icon: 'pi pi-fw pi-times', command: () => deletePayment(selectedPayment) },
])

const viewPayment = (payment) => {
  router.push({ name: 'payment.show', params: { id: payment.value.id } })
}

const deletePayment = async (payment) => {
  await paymentSt.deleteItems([payment.value.id])
  paymentSt.items.data = paymentSt.items.data.filter((p) => p.id !== payment.value.id)
  toastEvent('error', 'Payment Deleted', payment.value.name)
  clearSelectedPayment()
}

const clearSelectedPayment = () => {
  selectedPayment.value = {} as Payment
}

onMounted(async () => {
  await paymentSt.getItems()
})
</script>

<template>
  <MainLayout>
    <div class="flex flex-wrap gap-4 items-center">
      <Button @click="$router.push({ name: 'home' })" outlined severity="contrast" icon="pi pi-chevron-left" size="small" />
      <h1 class="text-xl font-bold">{{ $t('payments') }}</h1>
    </div>
    <hr class="my-4" />
    <div class="card">
      <ContextMenu ref="cm" :model="menuModel" @hide="clearSelectedPayment" />
      <MyDataTable :value="paymentSt.items.data" :loading="paymentSt.loading"
                   contextMenu v-model:contextMenuSelection="selectedPayment" @rowContextmenu="cm.show($event.originalEvent)">
        <template #paginatorstart>
          <Button type="button" icon="pi pi-refresh" text @click="paymentSt.getItems()" severity="secondary" />
        </template>
        <template #paginatorend>
          <Button type="button" icon="pi pi-download" text severity="secondary" />
        </template>
        <Column field="account" :header="$t('account')" />
        <Column field="amount" :header="$t('amount')" />
        <Column field="source" :header="$t('source')" />
        <Column field="status" :header="$t('status')">
          <template #body="{ data, field }">
            <Tag :value="$t(data.status)" :severity="data.status == 'completed' ? 'success' : 'secondary'" />
          </template>
        </Column>
        <Column field="year" :header="$t('year')" />
        <Column field="month" :header="$t('month')" />
        <Column style="width: 40px">
          <template #body="{ data, field }">
            <div class="flex flex-wrap gap-2">
              <Button v-if="auth.hasPerm('payment.show')" text severity="secondary" icon="pi pi-eye" @click="$router.push({name: 'payment.show', params: { id: data.id }})" />
            </div>
          </template>
        </Column>
      </MyDataTable>
    </div>
  </MainLayout>
</template>

<style>
</style>
