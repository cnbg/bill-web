<script setup lang="ts">
import { useAuthStore, useChargeStore } from '@/stores'
import type { Charge, ListQuery } from '@/types'
import { convertFilters, convertSort } from '@/utils'
import { FilterMatchMode } from '@primevue/core/api'
import { computed, onMounted, provide, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'

const { t } = useI18n()
const router = useRouter()
const auth = useAuthStore()
const chargeSt = useChargeStore()

const cm = ref()
const selectedCharge = ref<Charge>({} as Charge)
const menuModel = ref([] as any[])

if (auth.hasPerm('charge.view')) {
  menuModel.value.push({ label: t('view'), icon: 'pi pi-fw pi-eye', command: () => viewCharge(selectedCharge) })
}
if (auth.hasPerm('charge.delete')) {
  menuModel.value.push({ label: t('delete'), icon: 'pi pi-fw pi-times', command: () => deleteCharge(selectedCharge) })
}

const viewCharge = (charge: any) => {
  router.push({ name: 'charge.show', params: { id: charge.value.id } })
}

const deleteCharge = async (charge: any) => {
  if (confirm(t('are_you_sure'))) {
    const id = charge.value.id
    await chargeSt.deleteItem(id)
    chargeSt.items.data = await chargeSt.items.data.filter(p => p.id !== id)
    clearSelectedCharge()
  }
}

const clearSelectedCharge = () => {
  selectedCharge.value = {} as Charge
}

const page = ref(0)
const take = ref(20)
const skip = computed(() => Number(take.value * page.value))
const query = computed(() => ({ take: take.value, skip: skip.value, requireTotalCount: true }) as ListQuery)

async function onPageChange(event: any) {
  page.value = event.page
  await chargeSt.getItems(query.value)
}

const menu = ref([
  { icon: 'pi pi-home', command: () => router.push({ name: 'home' }) },
  { label: t('charges'), disabled: true },
])

provide('menu-start-items', menu)

const filterInitial = {
  account: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  amount: { value: null, matchMode: FilterMatchMode.EQUALS },
  status: { value: null, matchMode: FilterMatchMode.EQUALS },
  year: { value: null, matchMode: FilterMatchMode.EQUALS },
  month: { value: null, matchMode: FilterMatchMode.EQUALS },
}
const filters = ref(filterInitial)

const updateFilter = async () => {
  query.value.filter = convertFilters(filters.value)
  page.value = 0
  await chargeSt.getItems(query.value)
}

const clearFilters = async () => {
  filters.value = filterInitial
  await updateFilter()
}

const updateSort = async (event: any) => {
  query.value.sort = convertSort(event)
  await chargeSt.getItems(query.value)
}

const statuses = ref([
  { key: 'failed', name: t('failed') },
  { key: 'completed', name: t('completed') },
  { key: 'pending', name: t('pending') },
])
const getSeverity = (status?: string) => {
  switch (status) {
    case 'failed':
      return 'danger';

    case 'completed':
      return 'success';

    case 'pending':
      return 'secondary';
  }
}
onMounted(async () => {
  await updateFilter()
})
</script>

<template>
  <MainLayout>
    <div class="card mt-5">
      <ContextMenu ref="cm" :model="menuModel" @hide="clearSelectedCharge" />
      <MyDataTable :value="chargeSt.items.data" :loading="chargeSt.loading"
                   lazy :first="skip" :rows="take" :totalRecords="chargeSt.items.totalCount"
                   v-model:filters="filters" filterDisplay="row" sortMode="multiple"
                   @update:filters="updateFilter"
                   @update:multiSortMeta="updateSort"
                   @page="onPageChange($event)" @update:rows="take = $event"
                   contextMenu v-model:contextMenuSelection="selectedCharge"
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
          <Button type="button" icon="pi pi-refresh" text @click="chargeSt.getItems(query)" severity="secondary" />
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
        <Column field="status" sortable :header="$t('status')">
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
