<script setup lang="ts">
import { computed, onMounted, provide, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { FilterMatchMode } from '@primevue/core/api'
import { useAuthStore, useClientStore, useClientTypeStore } from '@/stores'
import { convertFilters, convertSort } from '@/utils'
import type { Client, ListQuery } from '@/types'

const { t } = useI18n()
const router = useRouter()
const auth = useAuthStore()
const clientSt = useClientStore()
const clientTypeSt = useClientTypeStore()

const selectedClient = ref<Client>({} as Client)

const resolveId = (client: any) => client?.value?.id ?? client?.id

const viewClient = (role: any) => {
  const id = resolveId(role)
  if (!id) return

  router.push({ name: 'client.show', params: { id: id } })
}

const createClient = () => {
  router.push({ name: 'client.create' })
}

const editClient = (org: any) => {
  const id = resolveId(org)
  if (!id) return

  router.push({ name: 'client.edit', params: { id: id } })
}

const deleteClient = async (org: any) => {
  if (confirm(t('are_you_sure'))) {
    const id = resolveId(org)
    if (!id) return

    await clientSt.deleteItem(id)
    clientSt.items.data = clientSt.items.data.filter(p => p.id !== id)
    clearSelectedClient()
  }
}

const clearSelectedClient = () => {
  selectedClient.value = {} as Client
}

const page = ref(0)
const take = ref(20)
const skip = computed(() => Number(take.value * page.value))
const query = computed(() => ({ take: take.value, skip: skip.value, requireTotalCount: true }) as ListQuery)

async function onPageChange(event: any) {
  page.value = event.page
  await clientSt.getItems(query.value)
}

const menu = ref([
  { icon: 'pi pi-chevron-left', command: () => router.push({ name: 'home' }) },
  { label: t('clients'), disabled: true },
])

provide('menu-start-items', menu)

const filterInitial = {
  account: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  clientTypeId: { value: null, matchMode: FilterMatchMode.EQUALS },
  floor: { value: null, matchMode: FilterMatchMode.EQUALS },
  entrance: { value: null, matchMode: FilterMatchMode.EQUALS },
  houseNum: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  apartNum: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  area: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  membersCount: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  note: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
}
const filters = ref(filterInitial)

const updateFilter = async () => {
  query.value.filter = convertFilters(filters.value)
  page.value = 0
  await clientSt.getItems(query.value)
}

const clearFilters = async () => {
  filters.value = filterInitial
  await updateFilter()
}

const updateSort = async (event: any) => {
  query.value.sort = convertSort(event)
  await clientSt.getItems(query.value)
}

onMounted(async () => {
  await clientTypeSt.getItems({ take: 1000, skip: 0 })
  await updateFilter()
})
</script>

<template>
  <MainLayout>
    <div class="card mt-5">
      <MyDataTable :value="clientSt.items.data" :loading="clientSt.loading"
                   lazy :first="skip" :rows="take" :totalRecords="clientSt.items.totalCount"
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
            <div>
              <Button v-if="auth.hasPerm('client.create')" icon="pi pi-plus" text
                      @click="router.push({ name: 'client.create' })" severity="secondary" />
            </div>
          </div>
        </template>
        <template #paginatorstart>
          <Button icon="pi pi-refresh" text @click="clientSt.getItems(query)" severity="secondary" />
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
        <Column field="clientTypeId" sortable :header="$t('client_type')">
          <template #body="{ data }">
            {{ data.clientType.name }}
          </template>
          <template #filter="{ filterModel, filterCallback }">
            <Select v-model="filterModel.value" :options="clientTypeSt.items.data" data-key="id" optionLabel="name" optionValue="id"
                    @change="filterCallback" :placeholder="$t('select')" showClear />
          </template>
        </Column>
        <Column field="floor" sortable :header="$t('floor')" data-type="numeric">
          <template #body="{ data }">
            {{ data.floor }}
          </template>
          <template #filter="{ filterModel, filterCallback }">
            <InputNumber v-model="filterModel.value" @keyup.enter="filterCallback()" :placeholder="$t('search')+'...'" />
          </template>
        </Column>
        <Column field="entrance" sortable :header="$t('entrance')" data-type="numeric">
          <template #body="{ data }">
            {{ data.entrance }}
          </template>
          <template #filter="{ filterModel, filterCallback }">
            <InputNumber v-model="filterModel.value" @keyup.enter="filterCallback()" :placeholder="$t('search')+'...'" />
          </template>
        </Column>
        <Column field="houseNum" sortable :header="$t('house_num')">
          <template #body="{ data }">
            {{ data.houseNum }}
          </template>
          <template #filter="{ filterModel, filterCallback }">
            <InputText v-model="filterModel.value" type="text" @keyup.enter="filterCallback()" :placeholder="$t('search')+'...'" />
          </template>
        </Column>
        <Column field="apartNum" sortable :header="$t('apart_num')">
          <template #body="{ data }">
            {{ data.apartNum }}
          </template>
          <template #filter="{ filterModel, filterCallback }">
            <InputText v-model="filterModel.value" type="text" @keyup.enter="filterCallback()" :placeholder="$t('search')+'...'" />
          </template>
        </Column>
        <Column field="area" sortable :header="$t('area') + ' м2'" data-type="numeric">
          <template #body="{ data }">
            {{ data.area }}
          </template>
          <template #filter="{ filterModel, filterCallback }">
            <InputNumber v-model="filterModel.value" @keyup.enter="filterCallback()" :placeholder="$t('search')+'...'" />
          </template>
        </Column>
        <Column field="membersCount" sortable :header="$t('members_count')" data-type="numeric" style="width: 50px;">
          <template #body="{ data }">
            {{ data.membersCount }}
          </template>
          <template #filter="{ filterModel, filterCallback }">
            <InputNumber v-model="filterModel.value" @keyup.enter="filterCallback()" :placeholder="$t('search')+'...'" />
          </template>
        </Column>
        <Column field="note" sortable :header="$t('note')">
          <template #body="{ data }">
            {{ data.note }}
          </template>
          <template #filter="{ filterModel, filterCallback }">
            <InputText v-model="filterModel.value" type="text" @keyup.enter="filterCallback()" :placeholder="$t('search')+'...'" />
          </template>
        </Column>
        <Column v-if="auth.hasPerm('client.create', 'client.edit', 'client.delete')" style="width: 8rem">
          <template #header="data">
            <Button v-if="auth.hasPerm('client.create')" type="button" icon="pi pi-plus" text severity="secondary" @click="createClient()" />
            <span v-else>{{ $t('actions') }}</span>
          </template>
          <template #body="{ data }">
            <div class="flex gap-2">
              <Button v-if="auth.hasPerm('client.view')" type="button" icon="pi pi-eye" text severity="secondary" @click="viewClient(data)" />
              <Button v-if="auth.hasPerm('client.edit')" type="button" icon="pi pi-pencil" text severity="secondary" @click="editClient(data)" />
              <Button v-if="auth.hasPerm('client.delete')" type="button" icon="pi pi-trash" text severity="danger" @click="deleteClient(data)" />
            </div>
          </template>
        </Column>
      </MyDataTable>
    </div>
  </MainLayout>
</template>

<style>
</style>
