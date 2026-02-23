<script setup lang="ts">
import { computed, onMounted, provide, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import type { ListQuery, Payment } from '@/types'
import { useAuthStore, usePaymentStore } from '@/stores'

const { t } = useI18n()
const router = useRouter()
const auth = useAuthStore()
const paymentSt = usePaymentStore()

const cm = ref()
const selectedPayment = ref<Payment>({} as Payment)
const menuModel = ref([] as any[])

if (auth.hasPerm('payment.view')) {
  menuModel.value.push({ label: t('view'), icon: 'pi pi-fw pi-eye', command: () => viewPayment(selectedPayment) })
}
if (auth.hasPerm('payment.delete')) {
  menuModel.value.push({ label: t('delete'), icon: 'pi pi-fw pi-times', command: () => deletePayment(selectedPayment) })
}

const viewPayment = (payment: any) => {
  router.push({ name: 'payment.show', params: { id: payment.value.id } })
}

const deletePayment = async (payment: any) => {
  if (confirm(t('are_you_sure'))) {
    const id = payment.value.id
    await paymentSt.deleteItem(id)
    paymentSt.items.data = await paymentSt.items.data.filter(p => p.id !== id)
    clearSelectedPayment()
  }
}

const clearSelectedPayment = () => {
  selectedPayment.value = {} as Payment
}

const page = ref(0)
const take = ref(20)
const skip = computed(() => Number(take.value * page.value))
const query = computed(() => ({ take: take.value, skip: skip.value, requireTotalCount: true }) as ListQuery)

async function onPageChange(event: any) {
  page.value = event.page
  await paymentSt.getItems(query.value)
}

const menu = ref([
  { icon: 'pi pi-home', command: () => router.push({ name: 'home' }) },
  { label: t('payments'), disabled: true },
])

provide('menu-start-items', menu)

onMounted(async () => {
  await paymentSt.getItems(query.value)
})
</script>

<template>
  <MainLayout>
    <div class="card mt-5">
      <ContextMenu ref="cm" :model="menuModel" @hide="clearSelectedPayment" />
      <MyDataTable :value="paymentSt.items.data" :loading="paymentSt.loading"
                   lazy :first="skip" :rows="take" :totalRecords="paymentSt.items.total_count"
                   @page="onPageChange($event)" @update:rows="take = $event"
                   contextMenu v-model:contextMenuSelection="selectedPayment"
                   @rowContextmenu="cm.show($event.originalEvent)">
        <template #paginatorstart>
          <Button type="button" icon="pi pi-refresh" text @click="paymentSt.getItems(query)" severity="secondary" />
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
      </MyDataTable>
    </div>
  </MainLayout>
</template>

<style>
</style>
