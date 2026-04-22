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

const selectedCharge = ref<Charge>({} as Charge)

const resolveId = (charge: any) => charge?.value?.id ?? charge?.id

const viewCharge = (role: any) => {
  const id = resolveId(role)
  if (!id) return

  router.push({ name: 'charge.show', params: { id: id } })
}

const createCharge = () => {
  router.push({ name: 'charge.create' })
}

const editCharge = (org: any) => {
  const id = resolveId(org)
  if (!id) return

  router.push({ name: 'charge.edit', params: { id: id } })
}

const deleteCharge = async (org: any) => {
  if (confirm(t('are_you_sure'))) {
    const id = resolveId(org)
    if (!id) return

    await chargeSt.deleteItem(id)
    chargeSt.items.data = chargeSt.items.data.filter(p => p.id !== id)
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
  { icon: 'pi pi-chevron-left', command: () => router.push({ name: 'home' }) },
  { label: t('charges'), disabled: true },
])

provide('menu-start-items', menu)

const filterInitial = {
  account: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  amount: { value: null, matchMode: FilterMatchMode.EQUALS },
  source: { value: null, matchMode: FilterMatchMode.EQUALS },
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

const sources = ref([
  { key: 'rate', name: t('rate') },
  { key: 'fine', name: t('fine') },
  { key: 'manual', name: t('manual') },
])

onMounted(async () => {
  await updateFilter()
})
</script>

<template>
  <MainLayout>
    <div class="card mt-5">
      <MyDataTable :value="chargeSt.items.data" :loading="chargeSt.loading"
                   lazy :first="skip" :rows="take" :totalRecords="chargeSt.items.totalCount"
                   v-model:filters="filters" filterDisplay="row" sortMode="multiple"
                   @update:filters="updateFilter"
                   @update:multiSortMeta="updateSort"
                   @page="onPageChange($event)" @update:rows="take = $event">
        <template #paginatorstart>
          <Button type="button" icon="pi pi-refresh" text @click="chargeSt.getItems(query)" severity="secondary" />
        </template>
        <template #paginatorend>
          <div class="flex flex-wrap gap-2 items-center">
            <Button type="button" icon="pi pi-download" text severity="secondary" />
            <Button icon="pi pi-times" text @click="clearFilters" severity="secondary" />
          </div>
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
