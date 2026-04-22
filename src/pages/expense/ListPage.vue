<script setup lang="ts">
import { computed, onMounted, provide, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import type { Expense, ListQuery } from '@/types'
import { useAuthStore, useExpenseStore } from '@/stores'
import { FilterMatchMode } from '@primevue/core/api'
import { convertFilters, convertSort } from '@/utils'

const { t } = useI18n()
const router = useRouter()
const auth = useAuthStore()
const expenseSt = useExpenseStore()

const selectedExpense = ref<Expense>({} as Expense)

const resolveId = (expense: any) => expense?.value?.id ?? expense?.id

const viewExpense = (role: any) => {
  const id = resolveId(role)
  if (!id) return

  router.push({ name: 'expense.show', params: { id: id } })
}

const createExpense = () => {
  router.push({ name: 'expense.create' })
}

const editExpense = (org: any) => {
  const id = resolveId(org)
  if (!id) return

  router.push({ name: 'expense.edit', params: { id: id } })
}

const deleteExpense = async (org: any) => {
  if (confirm(t('are_you_sure'))) {
    const id = resolveId(org)
    if (!id) return

    await expenseSt.deleteItem(id)
    expenseSt.items.data = expenseSt.items.data.filter(p => p.id !== id)
    clearSelectedExpense()
  }
}

const clearSelectedExpense = () => {
  selectedExpense.value = {} as Expense
}

const page = ref(0)
const take = ref(20)
const skip = computed(() => Number(take.value * page.value))
const query = computed(() => ({ take: take.value, skip: skip.value, requireTotalCount: true }) as ListQuery)

async function onPageChange(event: any) {
  page.value = event.page
  await expenseSt.getItems(query.value)
}

const menu = ref([
  { icon: 'pi pi-chevron-left', command: () => router.push({ name: 'home' }) },
  { label: t('expenses'), disabled: true },
])

provide('menu-start-items', menu)

const filterInitial = {
  amount: { value: null, matchMode: FilterMatchMode.EQUALS },
  year: { value: null, matchMode: FilterMatchMode.EQUALS },
  month: { value: null, matchMode: FilterMatchMode.EQUALS },
  note: { value: null, matchMode: FilterMatchMode.CONTAINS },
}
const filters = ref(filterInitial)

const updateFilter = async () => {
  query.value.filter = convertFilters(filters.value)
  page.value = 0
  await expenseSt.getItems(query.value)
}

const clearFilters = async () => {
  filters.value = filterInitial
  await updateFilter()
}

const updateSort = async (event: any) => {
  query.value.sort = convertSort(event)
  await expenseSt.getItems(query.value)
}

const statuses = ref([
  { key: 'failed', name: t('failed') },
  { key: 'completed', name: t('completed') },
  { key: 'pending', name: t('pending') },
])
const getSeverity = (status: string) => {
  switch (status) {
    case 'failed':
      return 'danger'

    case 'completed':
      return 'success'

    case 'pending':
      return 'secondary'
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
      <MyDataTable :value="expenseSt.items.data" :loading="expenseSt.loading"
                   lazy :first="skip" :rows="take" :totalRecords="expenseSt.items.totalCount"
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
          <Button type="button" icon="pi pi-refresh" text @click="expenseSt.getItems(query)" severity="secondary" />
        </template>
        <template #paginatorend>
          <Button type="button" icon="pi pi-download" text severity="secondary" />
        </template>
        <Column field="amount" sortable dataType="numeric" :header="$t('amount')">
          <template #body="{ data }">
            {{ data.amount }}
          </template>
          <template #filter="{ filterModel, filterCallback }">
            <InputNumber v-model="filterModel.value" mode="decimal" @keyup.enter="filterCallback()" :placeholder="$t('search')+'...'" />
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
        <Column field="note" :header="$t('note')">
          <template #body="{ data }">
            {{ data.note }}
          </template>
          <template #filter="{ filterModel, filterCallback }">
            <InputText v-model="filterModel.value" type="text" @keyup.enter="filterCallback()" :placeholder="$t('search')+'...'" />
          </template>
        </Column>
        <Column v-if="auth.hasPerm('expense.create', 'expense.edit', 'expense.delete')" style="width: 8rem">
          <template #header="data">
            <Button v-if="auth.hasPerm('expense.create')" type="button" icon="pi pi-plus" text severity="secondary" @click="createExpense()" />
            <span v-else>{{ $t('actions') }}</span>
          </template>
          <template #body="{ data }">
            <div class="flex gap-2">
              <Button v-if="auth.hasPerm('expense.edit')" type="button" icon="pi pi-pencil" text severity="secondary" @click="editExpense(data)" />
              <Button v-if="auth.hasPerm('expense.delete')" type="button" icon="pi pi-trash" text severity="danger" @click="deleteExpense(data)" />
            </div>
          </template>
        </Column>
      </MyDataTable>
    </div>
  </MainLayout>
</template>

<style>
</style>
