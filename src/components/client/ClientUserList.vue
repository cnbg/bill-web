<script setup lang="ts">
import { useAuthStore, useUserStore } from '@/stores'
import type { User, ListQuery } from '@/types'
import { convertFilters, convertSort } from '@/utils'
import { FilterMatchMode } from '@primevue/core/api'
import { computed, onMounted, provide, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'

const props = defineProps({
  clientId: { type: String, required: true }
})

const { t } = useI18n()
const router = useRouter()
const auth = useAuthStore()
const userSt = useUserStore()

const cm = ref()
const selectedUser = ref<User>({} as User)
const menuModel = ref([] as any[])

if (auth.hasPerm('user.view')) {
  menuModel.value.push({ label: t('view'), icon: 'pi pi-fw pi-eye', command: () => viewUser(selectedUser) })
}
if (auth.hasPerm('user.delete')) {
  menuModel.value.push({ label: t('delete'), icon: 'pi pi-fw pi-times', command: () => deleteUser(selectedUser) })
}

const viewUser = (user: any) => {
  router.push({ name: 'user.show', params: { id: user.value.id } })
}

const deleteUser = async (user: any) => {
  if (confirm(t('are_you_sure'))) {
    const id = user.value.id
    await userSt.deleteItem(id)
    userSt.items.data = await userSt.items.data.filter(p => p.id !== id)
    clearSelectedUser()
  }
}

const clearSelectedUser = () => {
  selectedUser.value = {} as User
}

const page = ref(0)
const take = ref(20)
const skip = computed(() => Number(take.value * page.value))
const query = computed(() => ({ take: take.value, skip: skip.value, requireTotalCount: true }) as ListQuery)

async function onPageChange(event: any) {
  page.value = event.page
  await userSt.getItems(query.value)
}

const menu = ref([
  { icon: 'pi pi-home', command: () => router.push({ name: 'home' }) },
  { label: t('users'), disabled: true },
])

provide('menu-start-items', menu)

const filterInitial = {
  clientId: { value: props.clientId, matchMode: FilterMatchMode.EQUALS },
  firstName: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  lastName: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  email: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
}
const filters = ref(filterInitial)

const updateFilter = async () => {
  query.value.filter = convertFilters(filters.value)
  page.value = 0
  await userSt.getItems(query.value)
}

const clearFilters = async () => {
  filters.value = filterInitial
  await updateFilter()
}

const updateSort = async (event: any) => {
  query.value.sort = convertSort(event)
  await userSt.getItems(query.value)
}

onMounted(async () => {
  await updateFilter()
})
</script>

<template>
  <ContextMenu ref="cm" :model="menuModel" @hide="clearSelectedUser" />
  <MyDataTable :value="userSt.items.data" :loading="userSt.loading"
               lazy :first="skip" :rows="take" :totalRecords="userSt.items.totalCount"
               v-model:filters="filters" filterDisplay="row" sortMode="multiple"
               @update:filters="updateFilter"
               @update:multiSortMeta="updateSort"
               @page="onPageChange($event)" @update:rows="take = $event"
               contextMenu v-model:contextMenuSelection="selectedUser"
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
      <Button type="button" icon="pi pi-refresh" text @click="userSt.getItems(query)" severity="secondary" />
    </template>
    <template #paginatorend>
      <Button type="button" icon="pi pi-download" text severity="secondary" />
    </template>
    <Column field="firstName" :header="$t('first_name')" sortable>
      <template #filter="{ filterModel, filterCallback }">
        <InputText v-model="filterModel.value" type="text" @keyup.enter="filterCallback()" :placeholder="$t('search')+'...'" />
      </template>
    </Column>
    <Column field="lastName" :header="$t('last_name')" sortable>
      <template #filter="{ filterModel, filterCallback }">
        <InputText v-model="filterModel.value" type="text" @keyup.enter="filterCallback()" :placeholder="$t('search')+'...'" />
      </template>
    </Column>
    <Column field="email" :header="$t('email')" sortable>
      <template #filter="{ filterModel, filterCallback }">
        <InputText v-model="filterModel.value" type="text" @keyup.enter="filterCallback()" :placeholder="$t('search')+'...'" />
      </template>
    </Column>
  </MyDataTable>
</template>

<style>
</style>
