<script setup lang="ts">
import { computed, onMounted, provide, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { useAuthStore, useClientStore } from '@/stores'
import MyDataTable from '@/components/MyDataTable.vue'
import type { ListQuery, Client } from '@/types'

const { t } = useI18n()
const router = useRouter()
const auth = useAuthStore()
const clientSt = useClientStore()

const cm = ref()
const selectedClient = ref<Client>({} as Client)
const menuModel = ref([] as any[])

if (auth.hasPerm('client.view')) {
  menuModel.value.push({ label: t('view'), icon: 'pi pi-fw pi-eye', command: () => viewClient(selectedClient) })
}
if (auth.hasPerm('client.delete')) {
  menuModel.value.push({ label: t('delete'), icon: 'pi pi-fw pi-times', command: () => deleteClient(selectedClient) })
}

const viewClient = (client: any) => {
  router.push({ name: 'client.show', params: { id: client.value.id } })
}

const deleteClient = async (client: any) => {
  if (confirm(t('are_you_sure'))) {
    const id = client.value.id
    await clientSt.deleteItem(id)
    clientSt.items.data = await clientSt.items.data.filter(p => p.id !== id)
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
  { icon: 'pi pi-home', command: () => router.push({ name: 'home' }) },
  { label: t('clients'), disabled: true },
])

provide('menu-start-items', menu)

onMounted(async () => {
  await clientSt.getItems(query.value)
})
</script>

<template>
  <MainLayout>
    <div class="card mt-5">
      <ContextMenu ref="cm" :model="menuModel" @hide="clearSelectedClient" />
      <MyDataTable :value="clientSt.items.data" :loading="clientSt.loading"
                   lazy :first="skip" :rows="take" :totalRecords="clientSt.items.total_count"
                   @page="onPageChange($event)" @update:rows="take = $event"
                   contextMenu v-model:contextMenuSelection="selectedClient"
                   @rowContextmenu="cm.show(menuModel.length > 0 ? $event.originalEvent : null)">
        <template #paginatorstart>
          <Button type="button" icon="pi pi-refresh" text @click="clientSt.getItems(query)" severity="secondary" />
        </template>
        <template #paginatorend>
          <Button type="button" icon="pi pi-download" text severity="secondary" />
        </template>
        <Column field="account" :header="$t('account')" />
      </MyDataTable>
    </div>
  </MainLayout>
</template>

<style>
</style>
