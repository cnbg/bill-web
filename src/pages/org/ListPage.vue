<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { toastEvent } from '@/utils'
import { useAuthStore, useOrgStore } from '@/stores'
import MyDataTable from '@/components/MyDataTable.vue'
import type { Org } from '@/types'

const router = useRouter()
const auth = useAuthStore()
const orgSt = useOrgStore()

const cm = ref()
const selectedOrg = ref<Org>({} as Org)
const menuModel = ref([
  { label: 'View', icon: 'pi pi-fw pi-search', command: () => viewOrg(selectedOrg) },
  { label: 'Delete', icon: 'pi pi-fw pi-times', command: () => deleteOrg(selectedOrg) },
])

const viewOrg = (org) => {
  router.push({ name: 'org.show', params: { id: org.value.id } })
}

const deleteOrg = async (org) => {
  await orgSt.deleteItems([org.value.id])
  orgSt.items.data = orgSt.items.data.filter((p) => p.id !== org.value.id)
  toastEvent('error', 'Org Deleted', org.value.name)
  clearSelectedOrg()
}

const clearSelectedOrg = () => {
  selectedOrg.value = {} as Org
}

onMounted(async () => {
  await orgSt.getItems()
})
</script>

<template>
  <MainLayout>
    <div class="flex flex-wrap gap-4 items-center">
      <Button @click="$router.push({ name: 'home' })" outlined severity="contrast" icon="pi pi-chevron-left" size="small" />
      <h1 class="text-xl font-bold">{{ $t('orgs') }}</h1>
    </div>
    <hr class="my-4" />
    <div class="card">
      <ContextMenu ref="cm" :model="menuModel" @hide="clearSelectedOrg" />
      <MyDataTable :value="orgSt.items.data" :loading="orgSt.loading"
                   contextMenu v-model:contextMenuSelection="selectedOrg" @rowContextmenu="cm.show($event.originalEvent)">
        <template #paginatorstart>
          <Button type="button" icon="pi pi-refresh" text @click="orgSt.getItems()" severity="secondary" />
        </template>
        <template #paginatorend>
          <Button type="button" icon="pi pi-download" text severity="secondary" />
        </template>
        <Column field="name" :header="$t('title')" />
        <Column style="width: 40px">
          <template #body="{ data, field }">
            <div class="flex flex-wrap gap-2">
              <Button v-if="auth.hasPerm('org.show')" text severity="secondary" icon="pi pi-eye" @click="$router.push({name: 'org.show', params: { id: data.id }})" />
            </div>
          </template>
        </Column>
      </MyDataTable>
    </div>
  </MainLayout>
</template>

<style>
</style>
