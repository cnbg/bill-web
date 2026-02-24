<script setup lang="ts">
import { computed, onMounted, provide, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { useAuthStore, useOrgStore } from '@/stores'
import MyDataTable from '@/components/MyDataTable.vue'
import type { ListQuery, Org } from '@/types'

const { t } = useI18n()
const router = useRouter()
const auth = useAuthStore()
const orgSt = useOrgStore()

const cm = ref()
const selectedOrg = ref<Org>({} as Org)
const menuModel = ref([] as any[])

if (auth.hasPerm('org.view')) {
  menuModel.value.push({ label: t('view'), icon: 'pi pi-fw pi-eye', command: () => viewOrg(selectedOrg) })
}
if (auth.hasPerm('org.delete')) {
  menuModel.value.push({ label: t('delete'), icon: 'pi pi-fw pi-times', command: () => deleteOrg(selectedOrg) })
}

const viewOrg = (org: any) => {
  router.push({ name: 'org.show', params: { id: org.value.id } })
}

const deleteOrg = async (org: any) => {
  if (confirm(t('are_you_sure'))) {
    const id = org.value.id
    await orgSt.deleteItem(id)
    orgSt.items.data = await orgSt.items.data.filter(p => p.id !== id)
    clearSelectedOrg()
  }
}

const clearSelectedOrg = () => {
  selectedOrg.value = {} as Org
}

const page = ref(0)
const take = ref(20)
const skip = computed(() => Number(take.value * page.value))
const query = computed(() => ({ take: take.value, skip: skip.value, requireTotalCount: true }) as ListQuery)

async function onPageChange(event: any) {
  page.value = event.page
  await orgSt.getItems(query.value)
}

const menu = ref([
  { icon: 'pi pi-home', command: () => router.push({ name: 'home' }) },
  { label: t('orgs'), disabled: true },
])

provide('menu-start-items', menu)

onMounted(async () => {
  await orgSt.getItems(query.value)
})
</script>

<template>
  <MainLayout>
    <div class="card mt-5">
      <ContextMenu ref="cm" :model="menuModel" @hide="clearSelectedOrg" />
      <MyDataTable :value="orgSt.items.data" :loading="orgSt.loading"
                   lazy :first="skip" :rows="take" :totalRecords="orgSt.items.total_count"
                   @page="onPageChange($event)" @update:rows="take = $event"
                   contextMenu v-model:contextMenuSelection="selectedOrg"
                   @rowContextmenu="cm.show(menuModel.length > 0 ? $event.originalEvent : null)">
        <template #paginatorstart>
          <Button type="button" icon="pi pi-refresh" text @click="orgSt.getItems(query)" severity="secondary" />
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
