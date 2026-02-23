<script setup lang="ts">
import { computed, onMounted, provide, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { useAuthStore, useOrgTypeStore } from '@/stores'
import MyDataTable from '@/components/MyDataTable.vue'
import type { ListQuery, OrgType } from '@/types'

const { t } = useI18n()
const router = useRouter()
const auth = useAuthStore()
const orgTypeSt = useOrgTypeStore()

const cm = ref()
const selectedOrgType = ref<OrgType>({} as OrgType)
const menuModel = ref([] as any[])

if (auth.hasPerm('org_type.view')) {
  menuModel.value.push({ label: t('view'), icon: 'pi pi-fw pi-eye', command: () => viewOrgType(selectedOrgType) })
}
if (auth.hasPerm('org_type.delete')) {
  menuModel.value.push({ label: t('delete'), icon: 'pi pi-fw pi-times', command: () => deleteOrgType(selectedOrgType) })
}

const viewOrgType = (orgType: any) => {
  router.push({ name: 'org_type.show', params: { id: orgType.value.id } })
}

const deleteOrgType = async (orgType: any) => {
  if (confirm(t('are_you_sure'))) {
    const id = orgType.value.id
    await orgTypeSt.deleteItem(id)
    orgTypeSt.items.data = await orgTypeSt.items.data.filter(p => p.id !== id)
    clearSelectedOrgType()
  }
}

const clearSelectedOrgType = () => {
  selectedOrgType.value = {} as OrgType
}

const page = ref(0)
const take = ref(20)
const skip = computed(() => Number(take.value * page.value))
const query = computed(() => ({ take: take.value, skip: skip.value, requireTotalCount: true }) as ListQuery)

async function onPageChange(event: any) {
  page.value = event.page
  await orgTypeSt.getItems(query.value)
}

const menu = ref([
  { icon: 'pi pi-home', command: () => router.push({ name: 'home' }) },
  { label: t('orgTypes'), disabled: true },
])

provide('menu-start-items', menu)

onMounted(async () => {
  await orgTypeSt.getItems(query.value)
})
</script>

<template>
  <MainLayout>
    <div class="card mt-5">
      <ContextMenu ref="cm" :model="menuModel" @hide="clearSelectedOrgType" />
      <MyDataTable :value="orgTypeSt.items.data" :loading="orgTypeSt.loading"
                   lazy :first="skip" :rows="take" :totalRecords="orgTypeSt.items.total_count"
                   @page="onPageChange($event)" @update:rows="take = $event"
                   contextMenu v-model:contextMenuSelection="selectedOrgType"
                   @rowContextmenu="cm.show(menuModel.length > 0 ? $event.originalEvent : null)">
        <template #paginatorstart>
          <Button type="button" icon="pi pi-refresh" text @click="orgTypeSt.getItems(query)" severity="secondary" />
        </template>
        <template #paginatorend>
          <Button type="button" icon="pi pi-download" text severity="secondary" />
        </template>
        <Column field="name" :header="$t('title')" />
        <Column style="width: 40px">
          <template #body="{ data, field }">
            <div class="flex flex-wrap gap-2">
              <Button v-if="auth.hasPerm('org_type.show')" text severity="secondary" icon="pi pi-eye" @click="$router.push({name: 'org_type.show', params: { id: data.id }})" />
            </div>
          </template>
        </Column>
      </MyDataTable>
    </div>
  </MainLayout>
</template>

<style>
</style>
