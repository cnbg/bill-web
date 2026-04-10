<script setup lang="ts">
import { computed, onMounted, provide, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import type { ListQuery, Payment } from '@/types'
import { useAuthStore, usePaymentStore } from '@/stores'
import { FilterMatchMode } from '@primevue/core/api'
import { convertFilters, convertSort } from '@/utils'

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

const filterInitial = {
  account: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  amount: { value: null, matchMode: FilterMatchMode.EQUALS },
  source: { value: null, matchMode: FilterMatchMode.EQUALS },
  status: { value: null, matchMode: FilterMatchMode.EQUALS },
  year: { value: null, matchMode: FilterMatchMode.EQUALS },
  month: { value: null, matchMode: FilterMatchMode.EQUALS },
}
const filters = ref(filterInitial)

const updateFilter = async () => {
  query.value.filter = convertFilters(filters.value)
  page.value = 0
  await paymentSt.getItems(query.value)
}

const clearFilters = async () => {
  filters.value = filterInitial
  await updateFilter()
}

const updateSort = async (event: any) => {
  query.value.sort = convertSort(event)
  await paymentSt.getItems(query.value)
}

const statuses = ref([
  { key: 'failed', name: t('failed') },
  { key: 'completed', name: t('completed') },
  { key: 'pending', name: t('pending') },
])
const getSeverity = (status: string) => {
  switch (status) {
    case 'failed':
      return 'danger';

    case 'completed':
      return 'success';

    case 'pending':
      return 'secondary';
  }
}

const sources = ref([
  { key: 'mbank', name: t('mbank') },
  { key: 'bakai', name: t('bakai') },
  { key: 'obank', name: t('obank') },
  { key: 'cash', name: t('cash') },
])

onMounted(async () => {
  await updateFilter()
})
</script>

<template>
  <MainLayout>
    <div class="card mt-5">
      <ContextMenu ref="cm" :model="menuModel" @hide="clearSelectedPayment" />
      <MyDataTable :value="paymentSt.items.data" :loading="paymentSt.loading"
                   lazy :first="skip" :rows="take" :totalRecords="paymentSt.items.totalCount"
                   v-model:filters="filters" filterDisplay="row" sortMode="multiple"
                   @update:filters="updateFilter"
                   @update:multiSortMeta="updateSort"
                   @page="onPageChange($event)" @update:rows="take = $event"
                   contextMenu v-model:contextMenuSelection="selectedPayment"
                   @rowContextmenu="cm.show($event.originalEvent)">
        <template #header>
          <div class="flex flex-wrap gap-4 items-center justify-between">
            <div>
              <Button :label="$t('clear')" icon="pi pi-times" text @click="clearFilters" severity="secondary" />
            </div>
            <div></div>
            <div></div>
          </div>
        </template>
        <template #paginatorstart>
          <Button type="button" icon="pi pi-refresh" text @click="paymentSt.getItems(query)" severity="secondary" />
        </template>
        <template #paginatorend>
          <Button type="button" icon="pi pi-download" text severity="secondary" />
        </template>
        <Column field="account" sortable :header="$t('account')">
          <template #body="{ data }">
            {{ data.account }}
          </template>
          <template #filter="{ filterModel, filterCallback }">
            <InputText v-model="filterModel.value" type="text" @keyup.enter="filterCallback()" :placeholder="$t('search')+'...'" />
          </template>
        </Column>
        <Column field="amount" sortable dataType="numeric" :header="$t('amount')">
          <template #body="{ data }">
            {{ data.amount }}
          </template>
          <template #filter="{ filterModel, filterCallback }">
            <InputNumber v-model="filterModel.value" mode="decimal" @keyup.enter="filterCallback()" :placeholder="$t('search')+'...'" />
          </template>
        </Column>
        <Column field="source" sortable :header="$t('source')">
          <template #body="{ data }">
            {{ $t(data.source) }}
          </template>
          <template #filter="{ filterModel, filterCallback }">
            <Select v-model="filterModel.value" :options="sources" optionLabel="name" optionValue="key"
                    @change="filterCallback" :placeholder="$t('select')" showClear />
          </template>
        </Column>
        <Column field="status" sortable :header="$t('status')">
          <template #body="{ data }">
            <Tag :value="$t(data.status)" :severity="getSeverity(data.status)" />
          </template>
          <template #filter="{ filterModel, filterCallback }">
            <Select v-model="filterModel.value" :options="statuses" optionLabel="name" optionValue="key"
                    @change="filterCallback" :placeholder="$t('select')" showClear>
              <template #option="slotProps">
                <Tag :value="slotProps.option.name" :severity="getSeverity(slotProps.option.key)" />
              </template>
            </Select>
          </template>
        </Column>
        <Column field="year" sortable :header="$t('year')" data-type="numeric">
          <template #body="{ data }">
            {{ data.year }}
          </template>
          <template #filter="{ filterModel, filterCallback }">
            <InputNumber v-model="filterModel.value" @keyup.enter="filterCallback()" :placeholder="$t('search')+'...'" />
          </template>
        </Column>
        <Column field="month" sortable :header="$t('month')" data-type="numeric">
          <template #body="{ data }">
            {{ data.month }}
          </template>
          <template #filter="{ filterModel, filterCallback }">
            <InputNumber v-model="filterModel.value" @keyup.enter="filterCallback()" :placeholder="$t('search')+'...'" />
          </template>
        </Column>
      </MyDataTable>
    </div>
  </MainLayout>
</template>

<style>
</style>
