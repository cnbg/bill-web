<script setup lang="ts">
import { computed, onMounted, provide, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import type { Balance, ListQuery } from '@/types'
import { useAuthStore, useBalanceStore } from '@/stores'
import { FilterMatchMode } from '@primevue/core/api'
import { convertFilters, convertSort } from '@/utils'

const { t } = useI18n()
const router = useRouter()
const auth = useAuthStore()
const balanceSt = useBalanceStore()

const selectedBalance = ref<Balance>({} as Balance)

const resolveId = (balance: any) => balance?.value?.id ?? balance?.id

const viewBalance = (role: any) => {
  const id = resolveId(role)
  if (!id) return

  router.push({ name: 'balance.show', params: { id: id } })
}

const createBalance = () => {
  router.push({ name: 'balance.create' })
}

const editBalance = (org: any) => {
  const id = resolveId(org)
  if (!id) return

  router.push({ name: 'balance.edit', params: { id: id } })
}

const deleteBalance = async (org: any) => {
  if (confirm(t('are_you_sure'))) {
    const id = resolveId(org)
    if (!id) return

    await balanceSt.deleteItem(id)
    balanceSt.items.data = balanceSt.items.data.filter(p => p.id !== id)
    clearSelectedBalance()
  }
}

const clearSelectedBalance = () => {
  selectedBalance.value = {} as Balance
}

const page = ref(0)
const take = ref(20)
const skip = computed(() => Number(take.value * page.value))
const query = computed(() => ({ take: take.value, skip: skip.value, requireTotalCount: true }) as ListQuery)

async function onPageChange(event: any) {
  page.value = event.page
  await balanceSt.getItems(query.value)
}

const menu = ref([
  { icon: 'pi pi-chevron-left', command: () => router.push({ name: 'home' }) },
  { label: t('balance'), disabled: true },
])

provide('menu-start-items', menu)

const filterInitial = {
  year: { value: null, matchMode: FilterMatchMode.EQUALS },
  month: { value: null, matchMode: FilterMatchMode.EQUALS },
  charges: { value: null, matchMode: FilterMatchMode.EQUALS },
  payments: { value: null, matchMode: FilterMatchMode.EQUALS },
  fines: { value: null, matchMode: FilterMatchMode.EQUALS },
  start: { value: null, matchMode: FilterMatchMode.EQUALS },
  end: { value: null, matchMode: FilterMatchMode.EQUALS },
}
const filters = ref(filterInitial)

const updateFilter = async () => {
  query.value.filter = convertFilters(filters.value)
  page.value = 0
  await balanceSt.getItems(query.value)
}

const clearFilters = async () => {
  filters.value = filterInitial
  await updateFilter()
}

const updateSort = async (event: any) => {
  query.value.sort = convertSort(event)
  await balanceSt.getItems(query.value)
}

onMounted(async () => {
  await updateFilter()
})
</script>

<template>
  <MainLayout>
    <div class="card mt-5">
      <MyDataTable :value="balanceSt.items.data" :loading="balanceSt.loading"
                   lazy :first="skip" :rows="take" :totalRecords="balanceSt.items.totalCount"
                   v-model:filters="filters" filterDisplay="row" sortMode="multiple"
                   @update:filters="updateFilter"
                   @update:multiSortMeta="updateSort"
                   @page="onPageChange($event)" @update:rows="take = $event">
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
          <Button type="button" icon="pi pi-refresh" text @click="balanceSt.getItems(query)" severity="secondary" />
        </template>
        <template #paginatorend>
          <Button type="button" icon="pi pi-download" text severity="secondary" />
        </template>
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
        <Column field="charges" sortable :header="$t('charges')" data-type="numeric">
          <template #body="{ data }">
            {{ data.charges }}
          </template>
          <template #filter="{ filterModel, filterCallback }">
            <InputNumber v-model="filterModel.value" @keyup.enter="filterCallback()" :placeholder="$t('search')+'...'" />
          </template>
        </Column>
        <Column field="payments" sortable :header="$t('payments')" data-type="numeric">
          <template #body="{ data }">
            {{ data.payments }}
          </template>
          <template #filter="{ filterModel, filterCallback }">
            <InputNumber v-model="filterModel.value" @keyup.enter="filterCallback()" :placeholder="$t('search')+'...'" />
          </template>
        </Column>
        <Column field="fines" sortable :header="$t('fines')" data-type="numeric">
          <template #body="{ data }">
            {{ data.fines }}
          </template>
          <template #filter="{ filterModel, filterCallback }">
            <InputNumber v-model="filterModel.value" @keyup.enter="filterCallback()" :placeholder="$t('search')+'...'" />
          </template>
        </Column>
        <Column field="start" sortable :header="$t('start_balance')" data-type="numeric">
          <template #body="{ data }">
            {{ data.start }}
          </template>
          <template #filter="{ filterModel, filterCallback }">
            <InputNumber v-model="filterModel.value" @keyup.enter="filterCallback()" :placeholder="$t('search')+'...'" />
          </template>
        </Column>
        <Column field="end" sortable :header="$t('end_balance')" data-type="numeric">
          <template #body="{ data }">
            {{ data.end }}
          </template>
          <template #filter="{ filterModel, filterCallback }">
            <InputNumber v-model="filterModel.value" @keyup.enter="filterCallback()" :placeholder="$t('search')+'...'" />
          </template>
        </Column>
        <Column v-if="auth.hasPerm('balance.create', 'balance.edit', 'balance.delete')" style="width: 8rem">
          <template #header="data">
            <Button v-if="auth.hasPerm('balance.create')" type="button" icon="pi pi-plus" text severity="secondary" @click="createBalance()" />
            <span v-else>{{ $t('actions') }}</span>
          </template>
          <template #body="{ data }">
            <div class="flex gap-2">
              <Button v-if="auth.hasPerm('balance.edit')" type="button" icon="pi pi-pencil" text severity="secondary" @click="editBalance(data)" />
              <Button v-if="auth.hasPerm('balance.delete')" type="button" icon="pi pi-trash" text severity="danger" @click="deleteBalance(data)" />
            </div>
          </template>
        </Column>
      </MyDataTable>
    </div>
  </MainLayout>
</template>

<style>
</style>
