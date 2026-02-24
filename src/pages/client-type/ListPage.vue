<script setup lang="ts">
import { computed, onMounted, provide, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { useAuthStore, useClientTypeStore } from '@/stores'
import MyDataTable from '@/components/MyDataTable.vue'
import type { ListQuery, ClientType } from '@/types'

const { t } = useI18n()
const router = useRouter()
const auth = useAuthStore()
const clientTypeSt = useClientTypeStore()

const cm = ref()
const selectedClientType = ref<ClientType>({} as ClientType)
const menuModel = ref([] as any[])

if (auth.hasPerm('client-type.view')) {
  menuModel.value.push({ label: t('view'), icon: 'pi pi-fw pi-eye', command: () => viewClientType(selectedClientType) })
}
if (auth.hasPerm('client-type.delete')) {
  menuModel.value.push({ label: t('delete'), icon: 'pi pi-fw pi-times', command: () => deleteClientType(selectedClientType) })
}

const viewClientType = (clientType: any) => {
  router.push({ name: 'client-type.show', params: { id: clientType.value.id } })
}

const deleteClientType = async (clientType: any) => {
  if (confirm(t('are_you_sure'))) {
    const id = clientType.value.id
    await clientTypeSt.deleteItem(id)
    clientTypeSt.items.data = await clientTypeSt.items.data.filter(p => p.id !== id)
    clearSelectedClientType()
  }
}

const clearSelectedClientType = () => {
  selectedClientType.value = {} as ClientType
}

const page = ref(0)
const take = ref(20)
const skip = computed(() => Number(take.value * page.value))
const query = computed(() => ({ take: take.value, skip: skip.value, requireTotalCount: true }) as ListQuery)

async function onPageChange(event: any) {
  page.value = event.page
  await clientTypeSt.getItems(query.value)
}

const menu = ref([
  { icon: 'pi pi-home', command: () => router.push({ name: 'home' }) },
  { label: t('org_types'), disabled: true },
])

provide('menu-start-items', menu)

onMounted(async () => {
  await clientTypeSt.getItems(query.value)
})
</script>

<template>
  <MainLayout>
    <div class="card mt-5">
      <ContextMenu ref="cm" :model="menuModel" @hide="clearSelectedClientType" />
      <MyDataTable :value="clientTypeSt.items.data" :loading="clientTypeSt.loading"
                   lazy :first="skip" :rows="take" :totalRecords="clientTypeSt.items.total_count"
                   @page="onPageChange($event)" @update:rows="take = $event"
                   contextMenu v-model:contextMenuSelection="selectedClientType"
                   @rowContextmenu="cm.show(menuModel.length > 0 ? $event.originalEvent : null)">
        <template #paginatorstart>
          <Button type="button" icon="pi pi-refresh" text @click="clientTypeSt.getItems(query)" severity="secondary" />
        </template>
        <template #paginatorend>
          <Button type="button" icon="pi pi-download" text severity="secondary" />
        </template>
        <Column field="name" :header="$t('title')" />
      </MyDataTable>
    </div>
  </MainLayout>
</template>

<style>
</style>
